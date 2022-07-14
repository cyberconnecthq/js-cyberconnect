export interface Connection {
    connectionType: string;
    target: string;
    namespace: string;
    createdAt: string;
    alias: string;
}
export declare type Connections = Connection[];
export declare enum Blockchain {
    ETH = "ETH",
    SOLANA = "SOLANA"
}
export declare type SolananChainRef = '';
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
export declare type Config = ConfigBase & (ConfigEth | ConfigSolana);
export declare enum Env {
    STAGING = "STAGING",
    PRODUCTION = "PRODUCTION"
}
export interface Endpoint {
    ceramicUrl: string;
    cyberConnectSchema: string;
    cyberConnectApi: string;
}
export declare type OperationName = 'follow' | 'like' | 'report' | 'watch' | 'vote' | 'unfollow' | BiConnectionType | 'ack_notifications' | 'ack_all_notifications';
export declare enum ConnectionType {
    FOLLOW = "FOLLOW",
    LIKE = "LIKE",
    REPORT = "REPORT",
    WATCH = "WATCH",
    VOTE = "VOTE"
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
export interface NotificationOperation {
    name: OperationName;
    from: string;
    namespace: string;
    network: Blockchain;
    timestamp: number;
    notificationIds?: string[];
}
export declare enum BiConnectionType {
    INIT = "INIT",
    ACCEPT = "ACCEPT",
    REJECT = "REJECT",
    TERMINATE = "TERMINATE",
    BLOCK = "BLOCK",
    UNBLOCK = "UNBLOCK"
}
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
    signingKey: string;
    network: string;
    type?: ConnectionType;
    instruction: BiConnectionType;
}
export interface AckNotificationsInput {
    address: string;
    namespace: string;
    signature: string;
    operation: string;
    signingKey: string;
    network: string;
    notificationIds: string[];
}
export interface AckAllNotificationsInput {
    address: string;
    namespace: string;
    signature: string;
    operation: string;
    signingKey: string;
    network: string;
    timestamp: string;
}
//# sourceMappingURL=types.d.ts.map