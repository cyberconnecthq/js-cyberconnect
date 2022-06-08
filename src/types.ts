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

export type OperationName =
  | 'follow'
  | 'like'
  | 'report'
  | 'watch'
  | 'vote'
  | 'unfollow'
  | BiConnectionType;

export enum ConnectionType {
  FOLLOW = 'FOLLOW',
  LIKE = 'LIKE',
  REPORT = 'REPORT',
  WATCH = 'WATCH',
  VOTE = 'VOTE',
}

export interface Operation {
  name: OperationName;
  from: string;
  to: string;
  namespace: string;
  network: Blockchain;
  alias?: string;
  timestamp: number;
  connectionType?: ConnectionType;
}

export enum BiConnectionType {
  INIT = 'INIT',
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  TERMINATE = 'TERMINATE',
  BLOCK = 'BLOCK',
  UNBLOCK = 'UNBLOCK',
}

// Mutation input types

export interface RegisterSigningKeyInput {
  address: string;
  message: string;
  signature: string;
  network: string;
}

export interface UpdateConnectionInput {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: string;
  operation: string;
  signingKey: string;
  alias?: string;
  network: string;
  type?: ConnectionType;
}

export interface BatchUpdateConnectionInput {
  fromAddr: string;
  signingInputs: {
    toAddr: string;
    signature: string;
    operation: string;
  }[];
  namespace: string;
  signingKey: string;
  network: Blockchain;
  type?: ConnectionType;
}

export interface BiConnectInput {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: string;
  operation: string;
  signing_key: string;
  network: string;
  type?: ConnectionType;
  instruction: BiConnectionType;
}
