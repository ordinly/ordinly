"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD = exports.DELETE = exports.PUT = exports.POST = exports.GET = exports.isSuccess = void 0;
var isSuccess = function (status) { return /^(2).*$/.test(status.toString()); };
exports.isSuccess = isSuccess;
var GET_1 = require("./GET");
Object.defineProperty(exports, "GET", { enumerable: true, get: function () { return GET_1.default; } });
var POST_1 = require("./POST");
Object.defineProperty(exports, "POST", { enumerable: true, get: function () { return POST_1.default; } });
var PUT_1 = require("./PUT");
Object.defineProperty(exports, "PUT", { enumerable: true, get: function () { return PUT_1.default; } });
var DELETE_1 = require("./DELETE");
Object.defineProperty(exports, "DELETE", { enumerable: true, get: function () { return DELETE_1.default; } });
var UPLOAD_1 = require("./UPLOAD");
Object.defineProperty(exports, "UPLOAD", { enumerable: true, get: function () { return UPLOAD_1.default; } });
__exportStar(require("./types"), exports);
