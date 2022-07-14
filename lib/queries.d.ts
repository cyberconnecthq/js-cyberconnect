import { Blockchain, RegisterSigningKeyInput, UpdateConnectionInput, BatchUpdateConnectionInput, BiConnectInput, AckNotificationsInput, AckAllNotificationsInput } from './types';
export declare type Query = 'connect' | 'disconnect';
export declare const registerSigningKeySchema: (input: RegisterSigningKeyInput) => {
    operationName: string;
    query: string;
    variables: {
        input: RegisterSigningKeyInput;
    };
};
export declare const connectQuerySchema: (input: UpdateConnectionInput) => {
    operationName: string;
    query: string;
    variables: {
        input: UpdateConnectionInput;
    };
};
export declare const batchConnectQuerySchema: (input: BatchUpdateConnectionInput) => {
    operationName: string;
    query: string;
    variables: {
        input: BatchUpdateConnectionInput;
    };
};
export declare const disconnectQuerySchema: (input: UpdateConnectionInput) => {
    operationName: string;
    query: string;
    variables: {
        input: UpdateConnectionInput;
    };
};
export declare const setAliasQuerySchema: (input: UpdateConnectionInput) => {
    operationName: string;
    query: string;
    variables: {
        input: UpdateConnectionInput;
    };
};
export declare const bidirectionalConnectQuerySchema: (input: BiConnectInput) => {
    operationName: string;
    query: string;
    variables: {
        input: BiConnectInput;
    };
};
export declare const ackNotificationsQuerySchema: (input: AckNotificationsInput) => {
    operationName: string;
    query: string;
    variables: {
        input: AckNotificationsInput;
    };
};
export declare const ackAllNotificationsQuerySchema: (input: AckAllNotificationsInput) => {
    operationName: string;
    query: string;
    variables: {
        input: AckAllNotificationsInput;
    };
};
export declare const authSchema: ({ address, signature, network, }: {
    address: string;
    signature: string;
    network: Blockchain;
}) => {
    operationName: string;
    query: string;
    variables: {
        address: string;
        signature: string;
        network: Blockchain;
    };
};
export declare const querySchemas: {
    connect: (input: UpdateConnectionInput) => {
        operationName: string;
        query: string;
        variables: {
            input: UpdateConnectionInput;
        };
    };
    batchConnect: (input: BatchUpdateConnectionInput) => {
        operationName: string;
        query: string;
        variables: {
            input: BatchUpdateConnectionInput;
        };
    };
    disconnect: (input: UpdateConnectionInput) => {
        operationName: string;
        query: string;
        variables: {
            input: UpdateConnectionInput;
        };
    };
    biConnect: (input: BiConnectInput) => {
        operationName: string;
        query: string;
        variables: {
            input: BiConnectInput;
        };
    };
    auth: ({ address, signature, network, }: {
        address: string;
        signature: string;
        network: Blockchain;
    }) => {
        operationName: string;
        query: string;
        variables: {
            address: string;
            signature: string;
            network: Blockchain;
        };
    };
    setAlias: (input: UpdateConnectionInput) => {
        operationName: string;
        query: string;
        variables: {
            input: UpdateConnectionInput;
        };
    };
    registerSigningKey: (input: RegisterSigningKeyInput) => {
        operationName: string;
        query: string;
        variables: {
            input: RegisterSigningKeyInput;
        };
    };
    ackNotifications: (input: AckNotificationsInput) => {
        operationName: string;
        query: string;
        variables: {
            input: AckNotificationsInput;
        };
    };
    ackAllNotifications: (input: AckAllNotificationsInput) => {
        operationName: string;
        query: string;
        variables: {
            input: AckAllNotificationsInput;
        };
    };
};
export declare const request: (url?: string, data?: {}) => Promise<any>;
export declare const handleQuery: (data: {
    query: string;
    variables: object;
    operationName: string;
}, url: string) => Promise<any>;
export declare const registerSigningKey: ({ address, message, signature, network, url, }: RegisterSigningKeyInput & {
    url: string;
}) => Promise<any>;
export declare const auth: ({ address, signature, network, url, }: {
    address: string;
    signature: string;
    network: Blockchain;
    url: string;
}) => Promise<any>;
export declare const follow: (input: UpdateConnectionInput, url: string) => Promise<any>;
export declare const batchFollow: (input: BatchUpdateConnectionInput, url: string) => Promise<any>;
export declare const unfollow: (input: UpdateConnectionInput, url: string) => Promise<any>;
export declare const setAlias: (input: UpdateConnectionInput, url: string) => Promise<any>;
export declare const biConnect: (input: BiConnectInput, url: string) => Promise<any>;
export declare const ackNotifications: (input: AckNotificationsInput, url: string) => Promise<any>;
export declare const ackAllNotifications: (input: AckAllNotificationsInput, url: string) => Promise<any>;
//# sourceMappingURL=queries.d.ts.map