"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.ConnectError = void 0;
var constant_1 = require("./constant");
var ConnectError = /** @class */ (function () {
    function ConnectError(code, message) {
        this.code = code;
        this.message = message || errors[code];
        if (!constant_1.DFLAG && window && window.localStorage) {
            delete window.localStorage[constant_1.C_ACCESS_TOKEN_KEY];
        }
    }
    ConnectError.prototype.printError = function () {
        console.error(this.message);
    };
    return ConnectError;
}());
exports.ConnectError = ConnectError;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["EmptyNamespace"] = "EmptyNamespace";
    ErrorCode["EmptyEthProvider"] = "EmptyEthProvider";
    ErrorCode["EmptyAuthProvider"] = "EmptyAuthProvider";
    ErrorCode["NetworkError"] = "NetworkError";
    ErrorCode["GraphqlError"] = "GraphqlError";
    ErrorCode["CeramicError"] = "CeramicError";
    ErrorCode["AuthProviderError"] = "AuthProviderError";
    ErrorCode["SignJwtError"] = "SignJwtError";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var errors = {
    EmptyNamespace: 'Namespace can not be empty',
    EmptyEthProvider: 'Eth provider can not be empty',
    EmptyAuthProvider: 'Could not find authProvider',
    NetworkError: '',
    GraphqlError: '',
    CeramicError: '',
    AuthProviderError: '',
    SignJwtError: '',
};
//# sourceMappingURL=error.js.map