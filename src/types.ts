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

export type SolananChainRef = '';

export interface CyberConnectStore {
  outboundLink: Connections;
}

export interface ConfigBase {
  namespace: string;
  env?: keyof typeof Env;
  provider: any;
  signingMessageEntity?: string;
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

export type OperationName = 'follow' | 'like' | 'report' | 'watch' | 'vote';

export enum ConnectionType {
  FOLLOW = 'FOLLOW',
  LIKE = 'LIKE',
  REPORT = 'REPORT',
  WATCH = 'WATCH',
  VOTE = 'VOTE',
}
export interface Operation {
  name: OperationName | 'unfollow';
  from: string;
  to: string;
  namespace: string;
  network: Blockchain;
  alias?: string;
  timestamp: number;
  connectionType?: ConnectionType;
}
