import { CeramicClient } from '@ceramicnetwork/http-client';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import ThreeIdProvider from '3id-did-provider';
import { EthereumAuthProvider } from '@3id/connect';
import { SolanaAuthProvider } from '@ceramicnetwork/blockchain-utils-linking';
import { hash } from '@stablelib/sha256';
import { fromString } from 'uint8arrays';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';
import { endpoints } from './network';
import { follow, registerSigningKey, setAlias, unfollow } from './queries';
import { ConnectError, ErrorCode } from './error';
import {
  Blockchain,
  Config,
  CyberConnectStore,
  Endpoint,
  Operation,
  CLIENT_TYPE,
} from './types';
import { getAddressByProvider, getSigningKeySignature } from './utils';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import { Env } from '.';
import { C_ACCESS_TOKEN_KEY, DFLAG } from './constant';
import {
  clearSigningKey,
  getPublicKey,
  hasSigningKey,
  signWithSigningKey,
} from './crypto';

export let CURRENT_CLIENT_TYPE: CLIENT_TYPE.WEB | CLIENT_TYPE.RN;
class CyberConnect {
  address: string = '';
  namespace: string;
  endpoint: Endpoint;
  ceramicClient: CeramicClient;
  authProvider: EthereumAuthProvider | SolanaAuthProvider | undefined;
  resolverRegistry: any;
  idxInstance: IDX | undefined;
  signature: string = '';
  chain: Blockchain = Blockchain.ETH;
  chainRef: string = '';
  provider: any = null;
  accountLink: Caip10Link | null = null;
  authId: string = '';
  did: DID | null = null;
  threeId: ThreeIdProvider | null = null;
  threeIdProvider: any = null;

  constructor(config: Config) {
    const {
      provider,
      namespace,
      env,
      chainRef,
      chain,
      clientType = CLIENT_TYPE.WEB,
    } = config;

    if (!namespace) {
      throw new ConnectError(ErrorCode.EmptyNamespace);
    }
    CURRENT_CLIENT_TYPE = clientType;

    this.namespace = namespace;
    this.endpoint = endpoints[env || Env.PRODUCTION];
    this.ceramicClient = new CeramicClient(this.endpoint.ceramicUrl);
    this.chain = chain || Blockchain.ETH;
    this.chainRef = chainRef || '';
    this.provider = provider;

    const keyDidResolver = KeyDidResolver.getResolver();
    const threeIdResolver = ThreeIdResolver.getResolver(this.ceramicClient);

    this.resolverRegistry = {
      ...threeIdResolver,
      ...keyDidResolver,
    };

    if (CURRENT_CLIENT_TYPE === CLIENT_TYPE.WEB) {
      delete window.localStorage[C_ACCESS_TOKEN_KEY];
    }
  }

  async getAuthProvider() {
    if (!this.provider) {
      throw new ConnectError(ErrorCode.EmptyEthProvider);
    }

    try {
      this.address = await getAddressByProvider(this.provider, this.chain);
    } catch (e) {
      throw new ConnectError(ErrorCode.AuthProviderError, e as string);
    }

    switch (this.chain) {
      case Blockchain.ETH: {
        this.authProvider = new EthereumAuthProvider(
          this.provider,
          this.address,
        );
        break;
      }
      case Blockchain.SOLANA: {
        if (!this.provider.publicKey) {
          throw new ConnectError(
            ErrorCode.AuthProviderError,
            'Wallet Not Connected',
          );
        }
        if (!this.provider.signMessage) {
          throw new ConnectError(
            ErrorCode.AuthProviderError,
            'Provider must implement signMessage',
          );
        }

        this.authProvider = new SolanaAuthProvider(
          this.provider,
          this.address,
          this.chainRef,
        );

        break;
      }
    }
  }

  private async setupAuthProvider() {
    if (this.signature) {
      return;
    }

    await this.getAuthProvider();

    if (!this.authProvider) {
      throw new ConnectError(ErrorCode.EmptyAuthProvider);
    }

    const rst = await this.authProvider.authenticate(
      'Allow this account to control your identity',
    );
    this.signature = rst;
  }

  async signWithJwt() {
    if (localStorage[C_ACCESS_TOKEN_KEY] && !DFLAG) {
      return localStorage[C_ACCESS_TOKEN_KEY];
    } else if (DFLAG) {
      const timestamp = new Date().getTime();

      const payload = {
        timestamp,
        target: this.address,
      };

      if (!this.threeId) {
        throw new ConnectError(ErrorCode.SignJwtError, 'Empty ThreeId');
      }

      const req = {
        method: 'did_createJWS',
        params: { payload, did: this.threeId.id },
      };

      const id = 0;

      if (!this.threeIdProvider) {
        throw new ConnectError(
          ErrorCode.SignJwtError,
          'Empty ThreeId provider',
        );
      }

      const sendRes = await this.threeIdProvider.send(
        Object.assign({ jsonrpc: '2.0', id }, req),
        null,
      );

      if (!sendRes || !sendRes.result) {
        return '';
      }

      if (!this.did) {
        throw new ConnectError(ErrorCode.SignJwtError, 'Empty DID');
      }

      const normalJWS = sendRes.result.jws;

      const jwsString = [
        normalJWS.signatures[0].protected,
        normalJWS.payload,
        normalJWS.signatures[0].signature,
      ].join('.');

      return jwsString;
    } else {
      return '';
    }
  }

  async setupDid() {
    if (this.idxInstance) {
      return;
    }

    if (!this.authProvider) {
      new ConnectError(ErrorCode.EmptyAuthProvider).printError();
      return;
    }

    if (!this.ceramicClient) {
      new ConnectError(
        ErrorCode.CeramicError,
        'Can not find ceramic client',
      ).printError();
      return;
    }

    const getPermission = async (request: any) => {
      return request.payload.paths;
    };

    const authSecret = hash(fromString(this.signature.slice(2)));
    this.authId = (await this.authProvider.accountId()).toString();

    this.threeId = await ThreeIdProvider.create({
      getPermission,
      authSecret,
      authId: this.authId,
      ceramic: this.ceramicClient,
    });

    this.threeIdProvider = this.threeId.getDidProvider();

    this.did = new DID({
      provider: this.threeIdProvider,
      resolver: this.resolverRegistry,
    });

    await this.did.authenticate();
    await this.ceramicClient.setDID(this.did);
  }

  createIdx() {
    if (this.idxInstance) {
      return;
    }

    this.idxInstance = new IDX({
      ceramic: this.ceramicClient,
      aliases: {
        cyberConnect: this.endpoint.cyberConnectSchema,
      },
      autopin: true,
    });
  }

  async createAccountLink() {
    if (this.accountLink && !!this.accountLink.did) {
      return;
    }
    this.accountLink = await Caip10Link.fromAccount(
      this.ceramicClient,
      this.authId,
    );

    if (!this.accountLink.did && this.did && this.authProvider) {
      await this.accountLink.setDid(this.did.id, this.authProvider, {
        anchor: false,
        publish: false,
      });
    }
  }

  async getOutboundLink() {
    if (!this.idxInstance) {
      throw new ConnectError(
        ErrorCode.CeramicError,
        'Could not find idx instance',
      );
    }

    try {
      const result = (await this.idxInstance.get(
        'cyberConnect',
      )) as CyberConnectStore;

      return result?.outboundLink || [];
    } catch (e) {
      throw new ConnectError(ErrorCode.CeramicError, e as string);
    }
  }
  // first step
  async authenticate() {
    try {
      if (!DFLAG) {
        this.authWithSigningKey();
      } else {
        await this.setupAuthProvider();
        await this.setupDid();
        await this.createAccountLink();
        this.createIdx();
      }
    } catch (e) {
      throw e;
    }
  }

  private async ceramicConnect(targetAddr: string, alias: string = '') {
    try {
      const outboundLink = await this.getOutboundLink();

      if (!this.idxInstance) {
        throw new ConnectError(
          ErrorCode.CeramicError,
          'Could not find idx instance',
        );
      }

      const index = outboundLink.findIndex((link) => {
        return link.target === targetAddr && link.namespace === this.namespace;
      });

      const curTimeStr = String(Date.now());

      if (index === -1) {
        outboundLink.push({
          target: targetAddr,
          connectionType: 'follow',
          namespace: this.namespace,
          alias,
          createdAt: curTimeStr,
        });
      } else {
        outboundLink[index].createdAt = curTimeStr;
      }

      this.idxInstance.set('cyberConnect', { outboundLink });
    } catch (e) {
      console.error(e);
    }
  }

  private async ceramicDisconnect(targetAddr: string) {
    try {
      const outboundLink = await this.getOutboundLink();

      if (!this.idxInstance) {
        throw new ConnectError(
          ErrorCode.CeramicError,
          'Could not find idx instance',
        );
      }

      const newOutboundLink = outboundLink.filter((link) => {
        return link.target !== targetAddr || link.namespace !== this.namespace;
      });

      this.idxInstance.set('cyberConnect', {
        outboundLink: newOutboundLink,
      });
    } catch (e) {
      console.error(e);
    }
  }

  private async ceramicSetAlias(targetAddr: string, alias: string) {
    try {
      const outboundLink = await this.getOutboundLink();

      if (!this.idxInstance) {
        throw new ConnectError(
          ErrorCode.CeramicError,
          'Could not find idx instance',
        );
      }

      const index = outboundLink.findIndex((link) => {
        return link.target === targetAddr && link.namespace === this.namespace;
      });

      if (index !== -1) {
        outboundLink[index] = { ...outboundLink[index], alias };
        this.idxInstance.set('cyberConnect', { outboundLink });
      } else {
        throw new ConnectError(
          ErrorCode.CeramicError,
          "Couldn't find the target address in the given namespace",
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  async connect(targetAddr: string, alias: string = '') {
    try {
      this.address = await this.getAddress();
      await this.authWithSigningKey();

      const operation: Operation = {
        name: 'follow',
        from: this.address,
        to: targetAddr,
        namespace: this.namespace,
        network: this.chain,
        alias,
        timestamp: Date.now(),
      };

      const signature = await signWithSigningKey(JSON.stringify(operation));
      const publicKey = await getPublicKey();

      const params = {
        fromAddr: this.address,
        toAddr: targetAddr,
        alias,
        namespace: this.namespace,
        url: this.endpoint.cyberConnectApi,
        signature,
        signingKey: publicKey,
        operation: JSON.stringify(operation),
        network: this.chain,
      };

      // const sign = await this.signWithJwt();

      const resp = await follow(params);

      if (resp?.data?.connect.result === 'INVALID_SIGNATURE') {
        await clearSigningKey();

        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.connect.result,
        );
      }

      if (resp?.data?.connect.result !== 'SUCCESS') {
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.connect.result,
        );
      }
    } catch (e: any) {
      throw new ConnectError(ErrorCode.GraphqlError, e.message || e);
    }
    if (DFLAG) {
      this.ceramicConnect(targetAddr, alias);
    }
  }

  async disconnect(targetAddr: string, alias: string = '') {
    try {
      this.address = await this.getAddress();
      await this.authWithSigningKey();

      const operation: Operation = {
        name: 'unfollow',
        from: this.address,
        to: targetAddr,
        namespace: this.namespace,
        network: this.chain,
        alias,
        timestamp: Date.now(),
      };

      const signature = await signWithSigningKey(JSON.stringify(operation));
      const publicKey = await getPublicKey();

      const params = {
        fromAddr: this.address,
        toAddr: targetAddr,
        alias,
        namespace: this.namespace,
        url: this.endpoint.cyberConnectApi,
        signature,
        signingKey: publicKey,
        operation: JSON.stringify(operation),
        network: this.chain,
      };

      // const sign = await this.signWithJwt();

      const resp = await unfollow(params);

      if (resp?.data?.disconnect.result === 'INVALID_SIGNATURE') {
        await clearSigningKey();

        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.disconnect.result,
        );
      }

      if (resp?.data?.disconnect.result !== 'SUCCESS') {
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.disconnect.result,
        );
      }
    } catch (e: any) {
      throw new ConnectError(ErrorCode.GraphqlError, e.message || e);
    }
    if (DFLAG) {
      this.ceramicDisconnect(targetAddr);
    }
  }

  async setAlias(targetAddr: string, alias: string = '') {
    try {
      this.address = await this.getAddress();
      await this.authWithSigningKey();

      const operation: Operation = {
        name: 'follow',
        from: this.address,
        to: targetAddr,
        namespace: this.namespace,
        network: this.chain,
        alias,
        timestamp: Date.now(),
      };

      const signature = await signWithSigningKey(JSON.stringify(operation));
      const publicKey = await getPublicKey();

      const params = {
        fromAddr: this.address,
        toAddr: targetAddr,
        alias,
        namespace: this.namespace,
        url: this.endpoint.cyberConnectApi,
        signature,
        signingKey: publicKey,
        operation: JSON.stringify(operation),
        network: this.chain,
      };

      // const sign = await this.signWithJwt();

      const resp = await setAlias(params);

      if (resp?.data?.alias.result === 'INVALID_SIGNATURE') {
        await clearSigningKey();
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.alias.result,
        );
      }

      if (resp?.data?.alias.result !== 'SUCCESS') {
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.alias.result,
        );
      }
    } catch (e: any) {
      throw new ConnectError(ErrorCode.GraphqlError, e.message || e);
    }
    if (DFLAG) {
      this.ceramicSetAlias(targetAddr, alias);
    }
  }

  async getAddress() {
    if (this.address) {
      return this.address;
    }
    return (this.address = await getAddressByProvider(
      this.provider,
      this.chain,
    ));
  }

  async authWithSigningKey() {
    if (await hasSigningKey()) {
      return;
    }

    const publicKey = await getPublicKey();
    const acknowledgement =
      'I authorize CyberConnect from this device using signing key:\n';
    const message = `${acknowledgement}${publicKey}`;

    this.address = await this.getAddress();
    const signingKeySignature = await getSigningKeySignature(
      this.provider,
      this.chain,
      message,
      this.address,
    );

    if (signingKeySignature) {
      const resp = await registerSigningKey({
        address: this.address,
        signature: signingKeySignature,
        message,
        network: this.chain,
        url: this.endpoint.cyberConnectApi,
      });

      if (resp?.data?.registerKey.result !== 'SUCCESS') {
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.alias.result,
        );
      }
    } else {
      throw new Error('signingKeySignature is empty');
    }
  }
}

export default CyberConnect;
