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
exports.arrayBuffer2Hex = exports.signWithSigningKey = exports.getPublicKey = exports.getSigningKey = exports.hasSigningKey = exports.generateSigningKey = exports.rotateSigningKey = exports.clearSigningKeyByAddress = exports.clearSigningKey = exports.clear = exports.set = exports.get = void 0;
var idb_1 = require("idb");
var dbPromise = null;
var SIGNKEY_KEY = 'signingKey_';
if (typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined') {
    dbPromise = (0, idb_1.openDB)('CyberConnect', 1, {
        upgrade: function (db) {
            db.createObjectStore('store');
        },
    });
}
function get(key) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbPromise) return [3 /*break*/, 2];
                    return [4 /*yield*/, dbPromise];
                case 1: return [2 /*return*/, (_a.sent()).get('store', key)];
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.get = get;
function set(key, val) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbPromise) return [3 /*break*/, 2];
                    return [4 /*yield*/, dbPromise];
                case 1: return [2 /*return*/, (_a.sent()).put('store', val, key)];
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.set = set;
function clear() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbPromise];
                case 1: return [2 /*return*/, (_a.sent()).clear('store')];
            }
        });
    });
}
exports.clear = clear;
function clearSigningKey() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, clear()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clearSigningKey = clearSigningKey;
function clearSigningKeyByAddress(address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbPromise];
                case 1: return [2 /*return*/, (_a.sent()).delete('store', SIGNKEY_KEY + address)];
            }
        });
    });
}
exports.clearSigningKeyByAddress = clearSigningKeyByAddress;
function rotateSigningKey(address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, clear()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, generateSigningKey(address)];
            }
        });
    });
}
exports.rotateSigningKey = rotateSigningKey;
function generateSigningKey(address) {
    return __awaiter(this, void 0, void 0, function () {
        var algorithm, extractable, keyUsages, signingKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algorithm = {
                        name: 'ECDSA',
                        namedCurve: 'P-256',
                    };
                    extractable = false;
                    keyUsages = ['sign', 'verify'];
                    return [4 /*yield*/, window.crypto.subtle.generateKey(algorithm, extractable, keyUsages)];
                case 1:
                    signingKey = _a.sent();
                    set(SIGNKEY_KEY + address, signingKey).then();
                    return [2 /*return*/, signingKey];
            }
        });
    });
}
exports.generateSigningKey = generateSigningKey;
function hasSigningKey(address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(SIGNKEY_KEY + address)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.hasSigningKey = hasSigningKey;
function getSigningKey(address) {
    return __awaiter(this, void 0, void 0, function () {
        var signingKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(SIGNKEY_KEY + address)];
                case 1:
                    signingKey = _a.sent();
                    if (!signingKey) {
                        signingKey = generateSigningKey(address);
                    }
                    return [2 /*return*/, signingKey];
            }
        });
    });
}
exports.getSigningKey = getSigningKey;
function getPublicKey(address) {
    return __awaiter(this, void 0, void 0, function () {
        var signingKey, exported;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSigningKey(address)];
                case 1:
                    signingKey = _a.sent();
                    return [4 /*yield*/, window.crypto.subtle.exportKey('spki', signingKey.publicKey)];
                case 2:
                    exported = _a.sent();
                    return [2 /*return*/, window.btoa(arrayBuffer2String(exported))];
            }
        });
    });
}
exports.getPublicKey = getPublicKey;
function signWithSigningKey(input, address) {
    return __awaiter(this, void 0, void 0, function () {
        var signingKey, algorithm, enc, encodedMessage, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSigningKey(address)];
                case 1:
                    signingKey = _a.sent();
                    algorithm = {
                        name: 'ECDSA',
                        hash: {
                            name: 'SHA-256',
                        },
                    };
                    enc = new TextEncoder();
                    encodedMessage = enc.encode(input);
                    return [4 /*yield*/, window.crypto.subtle.sign(algorithm, signingKey.privateKey, encodedMessage)];
                case 2:
                    signature = _a.sent();
                    return [2 /*return*/, arrayBuffer2Hex(signature)];
            }
        });
    });
}
exports.signWithSigningKey = signWithSigningKey;
function arrayBuffer2Hex(buffer) {
    return ('0x' +
        Array.prototype.map
            .call(new Uint8Array(buffer), function (x) { return ('00' + x.toString(16)).slice(-2); })
            .join(''));
}
exports.arrayBuffer2Hex = arrayBuffer2Hex;
function arrayBuffer2String(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}
//# sourceMappingURL=crypto.js.map