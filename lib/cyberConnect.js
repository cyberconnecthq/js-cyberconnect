"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var network_1 = require("./network");
var queries_1 = require("./queries");
var error_1 = require("./error");
var types_1 = require("./types");
var utils_1 = require("./utils");
var _1 = require(".");
var constant_1 = require("./constant");
var crypto_1 = require("./crypto");
var CyberConnect = /** @class */ (function () {
    function CyberConnect(config) {
        this.address = '';
        this.signature = '';
        this.chain = types_1.Blockchain.ETH;
        this.chainRef = '';
        this.provider = null;
        this.signingMessageEntity = '';
        var provider = config.provider, namespace = config.namespace, env = config.env, chainRef = config.chainRef, chain = config.chain, signingMessageEntity = config.signingMessageEntity;
        if (!namespace) {
            throw new error_1.ConnectError(error_1.ErrorCode.EmptyNamespace);
        }
        this.namespace = namespace;
        this.endpoint = network_1.endpoints[env || _1.Env.PRODUCTION];
        this.chain = chain || types_1.Blockchain.ETH;
        this.chainRef = chainRef || '';
        this.provider = provider;
        this.signingMessageEntity = signingMessageEntity;
        delete window.localStorage[constant_1.C_ACCESS_TOKEN_KEY];
    }
    CyberConnect.prototype.connect = function (targetAddr, alias, connectionType) {
        var _a, _b, _c, _d;
        if (alias === void 0) { alias = ''; }
        if (connectionType === void 0) { connectionType = types_1.ConnectionType.FOLLOW; }
        return __awaiter(this, void 0, void 0, function () {
            var _e, operation, signature, publicKey, params, resp, e_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 8, , 9]);
                        _e = this;
                        return [4 /*yield*/, this.getAddress()];
                    case 1:
                        _e.address = _f.sent();
                        return [4 /*yield*/, this.authWithSigningKey()];
                    case 2:
                        _f.sent();
                        operation = {
                            name: connectionType.toLowerCase(),
                            from: this.address,
                            to: targetAddr,
                            namespace: this.namespace,
                            network: this.chain,
                            timestamp: Date.now(),
                            alias: alias,
                        };
                        return [4 /*yield*/, (0, crypto_1.signWithSigningKey)(JSON.stringify(operation), this.address)];
                    case 3:
                        signature = _f.sent();
                        return [4 /*yield*/, (0, crypto_1.getPublicKey)(this.address)];
                    case 4:
                        publicKey = _f.sent();
                        params = {
                            fromAddr: this.address,
                            toAddr: targetAddr,
                            alias: alias,
                            namespace: this.namespace,
                            signature: signature,
                            signingKey: publicKey,
                            operation: JSON.stringify(operation),
                            network: this.chain,
                            type: connectionType,
                        };
                        return [4 /*yield*/, (0, queries_1.follow)(params, this.endpoint.cyberConnectApi)];
                    case 5:
                        resp = _f.sent();
                        if (!(((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.connect.result) === 'INVALID_SIGNATURE')) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, crypto_1.clearSigningKey)()];
                    case 6:
                        _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.connect.result);
                    case 7:
                        if (((_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.connect.result) !== 'SUCCESS') {
                            throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.connect.result);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, e_1.message || e_1);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CyberConnect.prototype.batchConnect = function (targetAddrs, connectionType) {
        var _a, _b, _c, _d, _e;
        if (connectionType === void 0) { connectionType = types_1.ConnectionType.FOLLOW; }
        return __awaiter(this, void 0, void 0, function () {
            var _f, timestamp_1, signPromises_1, signingInputs, publicKey, params, resp, e_2;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 8, , 9]);
                        _f = this;
                        return [4 /*yield*/, this.getAddress()];
                    case 1:
                        _f.address = _g.sent();
                        return [4 /*yield*/, this.authWithSigningKey()];
                    case 2:
                        _g.sent();
                        timestamp_1 = Date.now();
                        signPromises_1 = [];
                        targetAddrs.forEach(function (addr) {
                            var operation = {
                                name: connectionType.toLowerCase(),
                                from: _this.address,
                                to: addr,
                                namespace: _this.namespace,
                                network: _this.chain,
                                timestamp: timestamp_1,
                            };
                            signPromises_1.push(new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var signature;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, crypto_1.signWithSigningKey)(JSON.stringify(operation), this.address)];
                                        case 1:
                                            signature = _a.sent();
                                            resolve({
                                                toAddr: addr,
                                                signature: signature,
                                                operation: JSON.stringify(operation),
                                                type: connectionType,
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }));
                        });
                        return [4 /*yield*/, Promise.all(signPromises_1)];
                    case 3:
                        signingInputs = _g.sent();
                        return [4 /*yield*/, (0, crypto_1.getPublicKey)(this.address)];
                    case 4:
                        publicKey = _g.sent();
                        params = {
                            fromAddr: this.address,
                            namespace: this.namespace,
                            signingInputs: signingInputs,
                            signingKey: publicKey,
                            network: this.chain,
                        };
                        return [4 /*yield*/, (0, queries_1.batchFollow)(params, this.endpoint.cyberConnectApi)];
                    case 5:
                        resp = _g.sent();
                        if (!(((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.batchConnect.result) === 'INVALID_SIGNATURE')) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, crypto_1.clearSigningKey)()];
                    case 6:
                        _g.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.batchConnect.result);
                    case 7:
                        if (((_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.batchConnect.result) !== 'SUCCESS') {
                            throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.batchConnect.result);
                        }
                        return [2 /*return*/, (_e = resp === null || resp === void 0 ? void 0 : resp.data) === null || _e === void 0 ? void 0 : _e.batchConnect];
                    case 8:
                        e_2 = _g.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, e_2.message || e_2);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CyberConnect.prototype.disconnect = function (targetAddr, alias) {
        var _a, _b, _c, _d;
        if (alias === void 0) { alias = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _e, operation, signature, publicKey, params, resp, e_3;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 8, , 9]);
                        _e = this;
                        return [4 /*yield*/, this.getAddress()];
                    case 1:
                        _e.address = _f.sent();
                        return [4 /*yield*/, this.authWithSigningKey()];
                    case 2:
                        _f.sent();
                        operation = {
                            name: 'unfollow',
                            from: this.address,
                            to: targetAddr,
                            namespace: this.namespace,
                            network: this.chain,
                            timestamp: Date.now(),
                        };
                        return [4 /*yield*/, (0, crypto_1.signWithSigningKey)(JSON.stringify(operation), this.address)];
                    case 3:
                        signature = _f.sent();
                        return [4 /*yield*/, (0, crypto_1.getPublicKey)(this.address)];
                    case 4:
                        publicKey = _f.sent();
                        params = {
                            fromAddr: this.address,
                            toAddr: targetAddr,
                            namespace: this.namespace,
                            signature: signature,
                            signingKey: publicKey,
                            operation: JSON.stringify(operation),
                            network: this.chain,
                        };
                        return [4 /*yield*/, (0, queries_1.unfollow)(params, this.endpoint.cyberConnectApi)];
                    case 5:
                        resp = _f.sent();
                        if (!(((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.disconnect.result) === 'INVALID_SIGNATURE')) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, crypto_1.clearSigningKey)()];
                    case 6:
                        _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.disconnect.result);
                    case 7:
                        if (((_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.disconnect.result) !== 'SUCCESS') {
                            throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.disconnect.result);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        e_3 = _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, e_3.message || e_3);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CyberConnect.prototype.setAlias = function (targetAddr, alias) {
        var _a, _b, _c, _d;
        if (alias === void 0) { alias = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _e, operation, signature, publicKey, params, resp, e_4;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 8, , 9]);
                        _e = this;
                        return [4 /*yield*/, this.getAddress()];
                    case 1:
                        _e.address = _f.sent();
                        return [4 /*yield*/, this.authWithSigningKey()];
                    case 2:
                        _f.sent();
                        operation = {
                            name: 'follow',
                            from: this.address,
                            to: targetAddr,
                            namespace: this.namespace,
                            network: this.chain,
                            alias: alias,
                            timestamp: Date.now(),
                        };
                        return [4 /*yield*/, (0, crypto_1.signWithSigningKey)(JSON.stringify(operation), this.address)];
                    case 3:
                        signature = _f.sent();
                        return [4 /*yield*/, (0, crypto_1.getPublicKey)(this.address)];
                    case 4:
                        publicKey = _f.sent();
                        params = {
                            fromAddr: this.address,
                            toAddr: targetAddr,
                            alias: alias,
                            namespace: this.namespace,
                            signature: signature,
                            signingKey: publicKey,
                            operation: JSON.stringify(operation),
                            network: this.chain,
                        };
                        return [4 /*yield*/, (0, queries_1.setAlias)(params, this.endpoint.cyberConnectApi)];
                    case 5:
                        resp = _f.sent();
                        if (!(((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.alias.result) === 'INVALID_SIGNATURE')) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, crypto_1.clearSigningKey)()];
                    case 6:
                        _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.alias.result);
                    case 7:
                        if (((_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.alias.result) !== 'SUCCESS') {
                            throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.alias.result);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        e_4 = _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, e_4.message || e_4);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CyberConnect.prototype.bidirectionalConnect = function (targetAddr, biConnectionType) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, operation, signature, publicKey, params, resp, e_5;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 8, , 9]);
                        _e = this;
                        return [4 /*yield*/, this.getAddress()];
                    case 1:
                        _e.address = _f.sent();
                        return [4 /*yield*/, this.authWithSigningKey()];
                    case 2:
                        _f.sent();
                        operation = {
                            name: biConnectionType,
                            from: this.address,
                            to: targetAddr,
                            namespace: this.namespace,
                            network: this.chain,
                            timestamp: Date.now(),
                        };
                        return [4 /*yield*/, (0, crypto_1.signWithSigningKey)(JSON.stringify(operation), this.address)];
                    case 3:
                        signature = _f.sent();
                        return [4 /*yield*/, (0, crypto_1.getPublicKey)(this.address)];
                    case 4:
                        publicKey = _f.sent();
                        params = {
                            fromAddr: this.address,
                            toAddr: targetAddr,
                            namespace: this.namespace,
                            signature: signature,
                            signingKey: publicKey,
                            operation: JSON.stringify(operation),
                            network: this.chain,
                            instruction: biConnectionType,
                        };
                        return [4 /*yield*/, (0, queries_1.biConnect)(params, this.endpoint.cyberConnectApi)];
                    case 5:
                        resp = _f.sent();
                        if (!(((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.bidirectionalConnect.result) === 'INVALID_SIGNATURE')) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, crypto_1.clearSigningKey)()];
                    case 6:
                        _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.bidirectionalConnect.result);
                    case 7:
                        if (((_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.bidirectionalConnect.result) !== 'SUCCESS') {
                            throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.bidirectionalConnect.message);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        e_5 = _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, e_5.message || e_5);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CyberConnect.prototype.ackNotifications = function (notificationIds) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, operation, signature, publicKey, params, resp, e_6;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 8, , 9]);
                        _e = this;
                        return [4 /*yield*/, this.getAddress()];
                    case 1:
                        _e.address = _f.sent();
                        return [4 /*yield*/, this.authWithSigningKey()];
                    case 2:
                        _f.sent();
                        operation = {
                            name: 'ack_notifications',
                            from: this.address,
                            namespace: this.namespace,
                            network: this.chain,
                            notificationIds: notificationIds,
                            timestamp: Date.now(),
                        };
                        return [4 /*yield*/, (0, crypto_1.signWithSigningKey)(JSON.stringify(operation), this.address)];
                    case 3:
                        signature = _f.sent();
                        return [4 /*yield*/, (0, crypto_1.getPublicKey)(this.address)];
                    case 4:
                        publicKey = _f.sent();
                        params = {
                            address: this.address,
                            namespace: this.namespace,
                            signature: signature,
                            signingKey: publicKey,
                            operation: JSON.stringify(operation),
                            network: this.chain,
                            notificationIds: notificationIds,
                        };
                        return [4 /*yield*/, (0, queries_1.ackNotifications)(params, this.endpoint.cyberConnectApi)];
                    case 5:
                        resp = _f.sent();
                        if (!(((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.ackNotifications.result) === 'INVALID_SIGNATURE')) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, crypto_1.clearSigningKey)()];
                    case 6:
                        _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.ackNotifications.result);
                    case 7:
                        if (((_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.ackNotifications.result) !== 'SUCCESS') {
                            throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.ackNotifications.result);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        e_6 = _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, e_6.message || e_6);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CyberConnect.prototype.ackAllNotifications = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, timestamp, operation, signature, publicKey, params, resp, e_7;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 8, , 9]);
                        _e = this;
                        return [4 /*yield*/, this.getAddress()];
                    case 1:
                        _e.address = _f.sent();
                        return [4 /*yield*/, this.authWithSigningKey()];
                    case 2:
                        _f.sent();
                        timestamp = Date.now();
                        operation = {
                            name: 'ack_all_notifications',
                            from: this.address,
                            namespace: this.namespace,
                            network: this.chain,
                            timestamp: timestamp,
                        };
                        return [4 /*yield*/, (0, crypto_1.signWithSigningKey)(JSON.stringify(operation), this.address)];
                    case 3:
                        signature = _f.sent();
                        return [4 /*yield*/, (0, crypto_1.getPublicKey)(this.address)];
                    case 4:
                        publicKey = _f.sent();
                        params = {
                            address: this.address,
                            namespace: this.namespace,
                            signature: signature,
                            signingKey: publicKey,
                            operation: JSON.stringify(operation),
                            network: this.chain,
                            timestamp: timestamp.toString(),
                        };
                        return [4 /*yield*/, (0, queries_1.ackAllNotifications)(params, this.endpoint.cyberConnectApi)];
                    case 5:
                        resp = _f.sent();
                        if (!(((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.ackAllNotifications.result) === 'INVALID_SIGNATURE')) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, crypto_1.clearSigningKey)()];
                    case 6:
                        _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.ackAllNotifications.result);
                    case 7:
                        if (((_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.ackAllNotifications.result) !== 'SUCCESS') {
                            throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.ackAllNotifications.result);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        e_7 = _f.sent();
                        throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, e_7.message || e_7);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CyberConnect.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.address) {
                            return [2 /*return*/, this.address];
                        }
                        _a = this;
                        return [4 /*yield*/, (0, utils_1.getAddressByProvider)(this.provider, this.chain)];
                    case 1: return [2 /*return*/, (_a.address = _b.sent())];
                }
            });
        });
    };
    CyberConnect.prototype.authWithSigningKey = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, publicKey, acknowledgement, message, signingKeySignature, resp, e_8;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, (0, crypto_1.hasSigningKey)(this.address)];
                    case 1:
                        if (_d.sent()) {
                            return [2 /*return*/];
                        }
                        _c = this;
                        return [4 /*yield*/, this.getAddress()];
                    case 2:
                        _c.address = _d.sent();
                        return [4 /*yield*/, (0, crypto_1.getPublicKey)(this.address)];
                    case 3:
                        publicKey = _d.sent();
                        acknowledgement = "I authorize ".concat(this.signingMessageEntity || 'CyberConnect', " from this device using signing key:\n");
                        message = "".concat(acknowledgement).concat(publicKey);
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 9, , 10]);
                        return [4 /*yield*/, (0, utils_1.getSigningKeySignature)(this.provider, this.chain, message, this.address)];
                    case 5:
                        signingKeySignature = _d.sent();
                        if (!signingKeySignature) return [3 /*break*/, 7];
                        this.signature = signingKeySignature;
                        return [4 /*yield*/, (0, queries_1.registerSigningKey)({
                                address: this.address,
                                signature: signingKeySignature,
                                message: message,
                                network: this.chain,
                                url: this.endpoint.cyberConnectApi,
                            })];
                    case 6:
                        resp = _d.sent();
                        if (((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.registerKey.result) !== 'SUCCESS') {
                            throw new error_1.ConnectError(error_1.ErrorCode.GraphqlError, (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.alias.result);
                        }
                        return [3 /*break*/, 8];
                    case 7: throw new Error('signingKeySignature is empty');
                    case 8: return [2 /*return*/, publicKey];
                    case 9:
                        e_8 = _d.sent();
                        (0, crypto_1.clearSigningKeyByAddress)(this.address);
                        throw new Error('User cancel the sign process');
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return CyberConnect;
}());
exports.default = CyberConnect;
//# sourceMappingURL=cyberConnect.js.map