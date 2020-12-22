"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SECUREPATH_BASE_URL = process.env.SECUREPATH_BASE_URL;
if (!SECUREPATH_BASE_URL) {
    throw new Error("Environment variable SECUREPATH_BASE_URL is not set!");
}
exports.baseUrl = SECUREPATH_BASE_URL;
