export declare class ConnectError {
    code: ErrorCode;
    message: string;
    constructor(code: ErrorCode, message?: string);
    printError(): void;
}
export declare enum ErrorCode {
    EmptyNamespace = "EmptyNamespace",
    EmptyEthProvider = "EmptyEthProvider",
    EmptyAuthProvider = "EmptyAuthProvider",
    NetworkError = "NetworkError",
    GraphqlError = "GraphqlError",
    CeramicError = "CeramicError",
    AuthProviderError = "AuthProviderError",
    SignJwtError = "SignJwtError"
}
//# sourceMappingURL=error.d.ts.map