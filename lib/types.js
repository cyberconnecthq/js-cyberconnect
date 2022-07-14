"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiConnectionType = exports.ConnectionType = exports.Env = exports.Blockchain = void 0;
var Blockchain;
(function (Blockchain) {
    Blockchain["ETH"] = "ETH";
    Blockchain["SOLANA"] = "SOLANA";
})(Blockchain = exports.Blockchain || (exports.Blockchain = {}));
var Env;
(function (Env) {
    Env["STAGING"] = "STAGING";
    Env["PRODUCTION"] = "PRODUCTION";
})(Env = exports.Env || (exports.Env = {}));
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["FOLLOW"] = "FOLLOW";
    ConnectionType["LIKE"] = "LIKE";
    ConnectionType["REPORT"] = "REPORT";
    ConnectionType["WATCH"] = "WATCH";
    ConnectionType["VOTE"] = "VOTE";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
var BiConnectionType;
(function (BiConnectionType) {
    BiConnectionType["INIT"] = "INIT";
    BiConnectionType["ACCEPT"] = "ACCEPT";
    BiConnectionType["REJECT"] = "REJECT";
    BiConnectionType["TERMINATE"] = "TERMINATE";
    BiConnectionType["BLOCK"] = "BLOCK";
    BiConnectionType["UNBLOCK"] = "UNBLOCK";
})(BiConnectionType = exports.BiConnectionType || (exports.BiConnectionType = {}));
//# sourceMappingURL=types.js.map