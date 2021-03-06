"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
var firebase = require("firebase");
var Database = /** @class */ (function () {
    function Database() {
    }
    /**
    * Gets a value from the database
    * @param {string} uri - The uri of the value.
    * @returns {Promise<any>}
    */
    Database.prototype.get = function (uri) {
        var _this = this;
        var promise1 = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                module.exports.database.ref(uri).once('value').then(function (value) {
                    resolve(value.val());
                })["catch"](function (err) { return reject(err); });
                return [2 /*return*/];
            });
        }); });
        return promise1;
    };
    /**
   * Sets a value on the database
   * @param {string} uri - The uri of the value.
   * @param data - The value to set.
   */
    Database.prototype.set = function (uri, data) {
        return __awaiter(this, void 0, void 0, function () {
            var promise1;
            var _this = this;
            return __generator(this, function (_a) {
                promise1 = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        module.exports.database.ref(uri).set(data).then(function () {
                            resolve(data);
                        })["catch"](function (err) {
                            reject(err);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/, promise1];
            });
        });
    };
    /**
    * Increments a number value on the database
    * @param {string} uri - The uri of the value.
    * @param {number} num - The number of how much to increment.
    */
    Database.prototype.increment = function (uri, num) {
        return __awaiter(this, void 0, void 0, function () {
            var promise1;
            var _this = this;
            return __generator(this, function (_a) {
                promise1 = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var oldValue, newValue;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (isNaN(num))
                                    return [2 /*return*/, reject("Second parameter has to be of type Number")];
                                return [4 /*yield*/, module.exports.database.get(uri)];
                            case 1:
                                oldValue = _a.sent();
                                if (isNaN(oldValue))
                                    return [2 /*return*/, reject("The value has to be of type Number")];
                                newValue = oldValue + num;
                                module.exports.database.set(uri, newValue).then(function () {
                                    resolve();
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, promise1];
            });
        });
    };
    /**
    * Removes a value from the database
    * @param {string} uri - The uri of the value.
    */
    Database.prototype["delete"] = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var promise1;
            var _this = this;
            return __generator(this, function (_a) {
                promise1 = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        module.exports.database.ref(uri).set(null).then(function () {
                            resolve();
                        })["catch"](function (err) {
                            reject(err);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/, promise1];
            });
        });
    };
    return Database;
}());
exports.Database = Database;
/**
 * Initializes the database
 * @param {object} config - The config from firebase.
 * @returns {promise} The database
 */
function initializeApp(config) {
    var _this = this;
    var promise1 = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firebase.initializeApp(config)];
                case 1:
                    _a.sent();
                    module.exports.database = firebase.database();
                    resolve(module.exports.database);
                    return [2 /*return*/, promise1];
            }
        });
    }); });
    return promise1;
}
exports.initializeApp = initializeApp;
