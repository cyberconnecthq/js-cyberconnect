import { Blockchain, CLIENT_TYPE } from './types';
import bs58 from 'bs58';
import { hexlify } from '@ethersproject/bytes';
import { toUtf8Bytes } from '@ethersproject/strings';
import { CURRENT_CLIENT_TYPE } from './cyberConnect';

const isRN = () => CURRENT_CLIENT_TYPE === CLIENT_TYPE.RN;

export const encodeRpcMessage = (method: string, params?: any) => {
  return {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  };
};

export const safeSend = (
  provider: any,
  method: string,
  params?: Array<any>,
): Promise<any> => {
  if (params == null) {
    params = [];
  }

  if (provider.request) {
    return provider.request({ method, params }).then(
      (response: any) => response,
      (error: any) => {
        throw error;
      },
    );
  } else if (provider.sendAsync || provider.send) {
    const sendFunc = (
      provider.sendAsync ? provider.sendAsync : provider.send
    ).bind(provider);
    const request = encodeRpcMessage(method, params);
    return new Promise((resolve, reject) => {
      sendFunc(request, (error: any, response: any) => {
        if (error) reject(error);

        if (response.error) {
          const error = new Error(response.error.message);
          (<any>error).code = response.error.code;
          (<any>error).data = response.error.data;
          reject(error);
        }

        resolve(response.result);
      });
    });
  } else {
    throw new Error(
      `Unsupported provider; provider must implement one of the following methods: send, sendAsync, request`,
    );
  }
};

export const getAddressByProvider = async (
  provider: any,
  chain: Blockchain,
) => {
  switch (chain) {
    case Blockchain.ETH: {
      // rn connector
      if (isRN()) {
        return provider.accounts[0];
      }

      // ethers Web3Provider
      if (typeof provider.getSigner === 'function') {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        return address;
      }

      // ETH Provider
      const addresses = await safeSend(provider, 'eth_accounts');
      if (addresses && addresses[0]) {
        return addresses[0];
      } else {
        return '';
      }
    }
    case Blockchain.SOLANA: {
      return provider.publicKey.toString();
    }
    default: {
      return '';
    }
  }
};

export const getSigningKeySignature = async (
  provider: any,
  chain: Blockchain,
  message: string,
  address: string,
) => {
  if (chain === Blockchain.ETH) {
    // rn connector
    if (isRN()) {
      return await provider.signPersonalMessage([
        hexlify(toUtf8Bytes(message)),
        address,
      ]);
    }

    if (provider.isAuthereum) {
      return provider.signMessageWithSigningKey(message);
    }

    // ethers Web3Provider
    if (typeof provider.getSigner === 'function') {
      const signer = provider.getSigner();
      const signingKeySignature = await signer.signMessage(message);
      return signingKeySignature;
    }

    // ETH Provider
    const signingKeySignature = await safeSend(provider, 'personal_sign', [
      hexlify(toUtf8Bytes(message)),
      address,
    ]);

    return signingKeySignature;
  } else if (chain === Blockchain.SOLANA) {
    const signingKeySignature = bs58.encode(
      await provider.signMessage(new TextEncoder().encode(message)),
    );
    return signingKeySignature;
  } else {
    return '';
  }
};
