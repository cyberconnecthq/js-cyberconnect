import { Blockchain } from './types';
export declare const encodeRpcMessage: (method: string, params?: any) => {
    jsonrpc: string;
    id: number;
    method: string;
    params: any;
};
export declare const safeSend: (provider: any, method: string, params?: Array<any>) => Promise<any>;
export declare const getAddressByProvider: (provider: any, chain: Blockchain) => Promise<any>;
export declare const getSigningKeySignature: (provider: any, chain: Blockchain, message: string, address: string) => Promise<any>;
//# sourceMappingURL=utils.d.ts.map