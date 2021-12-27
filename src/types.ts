import { solana } from '@ceramicnetwork/blockchain-utils-linking';

export interface Connection {
  connectionType: string;
  target: string;
  namespace: string;
  createdAt: string;
  alias: string;
}

export type Connections = Connection[];

export enum Blockchain {
  ETH = 'ETH',
  SOLANA = 'SOLANA',
}

export type SolananChainRef =
  | typeof solana.SOLANA_DEVNET_CHAIN_REF
  | typeof solana.SOLANA_MAINNET_CHAIN_REF
  | typeof solana.SOLANA_TESTNET_CHAIN_REF;

export interface CyberConnectStore {
  outboundLink: Connections;
}

export interface ConfigBase {
  namespace: string;
  env?: keyof typeof Env;
  provider: any;
}

export interface ConfigEth {
  chain?: Blockchain.ETH;
  chainRef?: never;
}

export interface ConfigSolana {
  chain: Blockchain.SOLANA;
  chainRef: SolananChainRef;
}

export type Config = ConfigBase & (ConfigEth | ConfigSolana);

export enum Env {
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}

export interface Endpoint {
  ceramicUrl: string;
  cyberConnectSchema: string;
  cyberConnectApi: string;
}
