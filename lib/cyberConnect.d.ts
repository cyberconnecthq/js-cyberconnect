import { Blockchain, Config, Endpoint, ConnectionType, BiConnectionType } from './types';
declare class CyberConnect {
    address: string;
    namespace: string;
    endpoint: Endpoint;
    resolverRegistry: any;
    signature: string;
    chain: Blockchain;
    chainRef: string;
    provider: any;
    signingMessageEntity: string | undefined;
    constructor(config: Config);
    connect(targetAddr: string, alias?: string, connectionType?: ConnectionType): Promise<void>;
    batchConnect(targetAddrs: string[], connectionType?: ConnectionType): Promise<any>;
    disconnect(targetAddr: string, alias?: string): Promise<void>;
    setAlias(targetAddr: string, alias?: string): Promise<void>;
    bidirectionalConnect(targetAddr: string, biConnectionType: BiConnectionType): Promise<void>;
    ackNotifications(notificationIds: string[]): Promise<void>;
    ackAllNotifications(): Promise<void>;
    getAddress(): Promise<any>;
    authWithSigningKey(): Promise<void>;
}
export default CyberConnect;
//# sourceMappingURL=cyberConnect.d.ts.map