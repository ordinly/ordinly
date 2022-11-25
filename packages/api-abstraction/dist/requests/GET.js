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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _1 = require("./");
var initialize_1 = require("../initialize");
var GET = function (_a) {
    var endpoint = _a.endpoint, _b = _a.type, type = _b === void 0 ? "application/json" : _b, _c = _a.queryParams, queryParams = _c === void 0 ? {} : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var queryParamString, response, reader_1, blob, caught_1, response, error;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 8, , 10]);
                    queryParamString = Object.entries(queryParams).reduce(function (total, _a, index) {
                        var key = _a[0], value = _a[1];
                        return "".concat(total).concat(index ? "&" : "").concat(key, "=").concat(Array.isArray(value) ? value.join(",") : value);
                    }, "?");
                    return [4 /*yield*/, fetch("".concat((initialize_1.config === null || initialize_1.config === void 0 ? void 0 : initialize_1.config.host) || "").concat(endpoint).concat(queryParamString !== "?" ? queryParamString : ""), {
                            method: "GET",
                            credentials: "include",
                            headers: {
                                "Content-Type": type,
                            },
                        })];
                case 1:
                    response = _e.sent();
                    if (!(0, _1.isSuccess)(response.status)) return [3 /*break*/, 6];
                    if (!(type === "application/json")) return [3 /*break*/, 3];
                    return [4 /*yield*/, (response === null || response === void 0 ? void 0 : response.json())];
                case 2: return [2 /*return*/, _e.sent()];
                case 3:
                    if (!(type === "image/*")) return [3 /*break*/, 5];
                    reader_1 = (_d = response === null || response === void 0 ? void 0 : response.body) === null || _d === void 0 ? void 0 : _d.getReader();
                    return [4 /*yield*/, new Response(new ReadableStream({
                            start: function (controller) {
                                return pump();
                                function pump() {
                                    return reader_1 === null || reader_1 === void 0 ? void 0 : reader_1.read().then(function (_a) {
                                        var done = _a.done, value = _a.value;
                                        // When no more data needs to be consumed, close the stream
                                        if (done) {
                                            controller.close();
                                            return;
                                        }
                                        // Enqueue the next data chunk into our target stream
                                        controller.enqueue(value);
                                        return pump();
                                    });
                                }
                            },
                        })).blob()];
                case 4:
                    blob = _e.sent();
                    return [2 /*return*/, blob];
                case 5: return [3 /*break*/, 7];
                case 6: throw { response: response };
                case 7: return [3 /*break*/, 10];
                case 8:
                    caught_1 = _e.sent();
                    response = caught_1.response;
                    if ((response === null || response === void 0 ? void 0 : response.status) === 401) {
                        window.location.href = "/?form=login";
                    }
                    return [4 /*yield*/, (response === null || response === void 0 ? void 0 : response.json())];
                case 9:
                    error = (_e.sent()).error;
                    throw { status: response.status, error: error };
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.default = GET;
