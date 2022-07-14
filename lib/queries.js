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
exports.ackAllNotifications = exports.ackNotifications = exports.biConnect = exports.setAlias = exports.unfollow = exports.batchFollow = exports.follow = exports.auth = exports.registerSigningKey = exports.handleQuery = exports.request = exports.querySchemas = exports.authSchema = exports.ackAllNotificationsQuerySchema = exports.ackNotificationsQuerySchema = exports.bidirectionalConnectQuerySchema = exports.setAliasQuerySchema = exports.disconnectQuerySchema = exports.batchConnectQuerySchema = exports.connectQuerySchema = exports.registerSigningKeySchema = void 0;
var types_1 = require("./types");
var registerSigningKeySchema = function (input) {
    return {
        operationName: 'registerKey',
        query: "mutation registerKey($input: RegisterKeyInput!) {\n      registerKey(input: $input) {\n        result\n      }\n    }",
        variables: { input: input },
    };
};
exports.registerSigningKeySchema = registerSigningKeySchema;
var connectQuerySchema = function (input) {
    return {
        operationName: 'connect',
        query: "mutation connect($input: UpdateConnectionInput!) {connect(input: $input) {result}}",
        variables: {
            input: input,
        },
    };
};
exports.connectQuerySchema = connectQuerySchema;
var batchConnectQuerySchema = function (input) {
    return {
        operationName: 'batchConnect',
        query: "mutation batchConnect($input: BatchUpdateConnectionInput!) {\n      batchConnect(input: $input) {\n        result\n        alreadyFollowed\n        successFollowed\n        failToFollow\n      }\n    }",
        variables: {
            input: input,
        },
    };
};
exports.batchConnectQuerySchema = batchConnectQuerySchema;
var disconnectQuerySchema = function (input) {
    return {
        operationName: 'disconnect',
        query: "mutation disconnect($input: UpdateConnectionInput!) {disconnect(input: $input) {result}}",
        variables: {
            input: input,
        },
    };
};
exports.disconnectQuerySchema = disconnectQuerySchema;
var setAliasQuerySchema = function (input) {
    return {
        operationName: 'alias',
        query: "mutation alias($input: UpdateConnectionInput!) {alias(input: $input) {result}}",
        variables: {
            input: input,
        },
    };
};
exports.setAliasQuerySchema = setAliasQuerySchema;
var bidirectionalConnectQuerySchema = function (input) {
    return {
        operationName: 'bidirectionalConnect',
        query: "mutation bidirectionalConnect($input: BiConnectInput!) {\n      bidirectionalConnect(input: $input) {\n        result\n        message\n      }\n    }",
        variables: {
            input: input,
        },
    };
};
exports.bidirectionalConnectQuerySchema = bidirectionalConnectQuerySchema;
var ackNotificationsQuerySchema = function (input) {
    return {
        operationName: 'ackNotifications',
        query: "mutation ackNotifications($input: AckNotificationsInput!) {\n      ackNotifications(input: $input) {\n        result\n      }\n    }",
        variables: {
            input: input,
        },
    };
};
exports.ackNotificationsQuerySchema = ackNotificationsQuerySchema;
var ackAllNotificationsQuerySchema = function (input) {
    return {
        operationName: 'ackAllNotifications',
        query: "mutation ackAllNotifications($input: AckAllNotificationsInput!) {\n      ackAllNotifications(input: $input) {\n        result\n      }\n    }",
        variables: {
            input: input,
        },
    };
};
exports.ackAllNotificationsQuerySchema = ackAllNotificationsQuerySchema;
var authSchema = function (_a) {
    var address = _a.address, signature = _a.signature, _b = _a.network, network = _b === void 0 ? types_1.Blockchain.ETH : _b;
    return {
        operationName: 'auth',
        query: "mutation auth($address: String!, $signature: String!, $network: String) {\n      auth(address: $address, signature: $signature, network: $network) {\n        result\n        authToken\n      }\n    }",
        variables: { address: address, signature: signature, network: network },
    };
};
exports.authSchema = authSchema;
exports.querySchemas = {
    connect: exports.connectQuerySchema,
    batchConnect: exports.batchConnectQuerySchema,
    disconnect: exports.disconnectQuerySchema,
    biConnect: exports.bidirectionalConnectQuerySchema,
    auth: exports.authSchema,
    setAlias: exports.setAliasQuerySchema,
    registerSigningKey: exports.registerSigningKeySchema,
    ackNotifications: exports.ackNotificationsQuerySchema,
    ackAllNotifications: exports.ackAllNotificationsQuerySchema,
};
var request = function (url, data) {
    if (url === void 0) { url = ''; }
    if (data === void 0) { data = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify(data),
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
};
exports.request = request;
var handleQuery = function (data, url) {
    return (0, exports.request)(url, data);
};
exports.handleQuery = handleQuery;
var registerSigningKey = function (_a) {
    var address = _a.address, message = _a.message, signature = _a.signature, _b = _a.network, network = _b === void 0 ? types_1.Blockchain.ETH : _b, url = _a.url;
    var result = exports.querySchemas['registerSigningKey']({
        address: address,
        message: message,
        signature: signature,
        network: network,
    });
    return (0, exports.handleQuery)(result, url);
};
exports.registerSigningKey = registerSigningKey;
var auth = function (_a) {
    var address = _a.address, signature = _a.signature, _b = _a.network, network = _b === void 0 ? types_1.Blockchain.ETH : _b, url = _a.url;
    var result = exports.querySchemas['auth']({
        address: address,
        signature: signature,
        network: network,
    });
    return (0, exports.handleQuery)(result, url);
};
exports.auth = auth;
var follow = function (input, url) {
    var schema = exports.querySchemas['connect'](input);
    return (0, exports.handleQuery)(schema, url);
};
exports.follow = follow;
var batchFollow = function (input, url) {
    var schema = exports.querySchemas['batchConnect'](input);
    return (0, exports.handleQuery)(schema, url);
};
exports.batchFollow = batchFollow;
var unfollow = function (input, url) {
    var schema = exports.querySchemas['disconnect'](input);
    return (0, exports.handleQuery)(schema, url);
};
exports.unfollow = unfollow;
var setAlias = function (input, url) {
    var schema = exports.querySchemas['setAlias'](input);
    return (0, exports.handleQuery)(schema, url);
};
exports.setAlias = setAlias;
var biConnect = function (input, url) {
    var schema = exports.querySchemas['biConnect'](input);
    return (0, exports.handleQuery)(schema, url);
};
exports.biConnect = biConnect;
var ackNotifications = function (input, url) {
    var schema = exports.querySchemas['ackNotifications'](input);
    return (0, exports.handleQuery)(schema, url);
};
exports.ackNotifications = ackNotifications;
var ackAllNotifications = function (input, url) {
    var schema = exports.querySchemas['ackAllNotifications'](input);
    return (0, exports.handleQuery)(schema, url);
};
exports.ackAllNotifications = ackAllNotifications;
//# sourceMappingURL=queries.js.map