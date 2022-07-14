export declare function get(key: string): Promise<any>;
export declare function set(key: string, val: CryptoKeyPair): Promise<any>;
export declare function clear(): Promise<any>;
export declare function clearSigningKey(): Promise<void>;
export declare function clearSigningKeyByAddress(address: string): Promise<any>;
export declare function rotateSigningKey(address: string): Promise<CryptoKeyPair>;
export declare function generateSigningKey(address: string): Promise<CryptoKeyPair>;
export declare function hasSigningKey(address: string): Promise<any>;
export declare function getSigningKey(address: string): Promise<any>;
export declare function getPublicKey(address: string): Promise<string>;
export declare function signWithSigningKey(input: string, address: string): Promise<string>;
export declare function arrayBuffer2Hex(buffer: ArrayBuffer): string;
//# sourceMappingURL=crypto.d.ts.map