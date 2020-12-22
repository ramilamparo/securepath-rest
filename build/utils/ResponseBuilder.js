"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var securepath_api_1 = require("securepath-api");
var StatusCode;
(function (StatusCode) {
    StatusCode["OK"] = "OK";
    StatusCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    StatusCode["INVALID_ACTION"] = "INVALID_ACTION";
    StatusCode["UNAUTHENTICATED"] = "UNAUTHENTICATED";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
var ResponseBuilder = /** @class */ (function () {
    function ResponseBuilder(data, meta) {
        var _this = this;
        if (meta === void 0) { meta = {
            success: false,
            message: "Unknown server error",
            errors: [],
            code: StatusCode.UNKNOWN_ERROR
        }; }
        this.data = data;
        this.meta = meta;
        this.setData = function (data) {
            _this.data = data;
        };
        this.setSuccess = function (success) {
            _this.meta.success = success;
        };
        this.appendError = function (error) {
            _this.meta.errors.push(error);
        };
        this.setCode = function (code) {
            _this.meta.code = code;
        };
        this.setMessage = function (message) {
            _this.meta.message = message;
        };
        this.handleExpressError = function (e, res) {
            if (e instanceof securepath_api_1.AuthNeededException) {
                _this.setCode(StatusCode.UNAUTHENTICATED);
                _this.setMessage(e.message);
                res.status(401);
            }
            else if (e instanceof securepath_api_1.DeviceExistingException) {
                _this.setCode(StatusCode.INVALID_ACTION);
                _this.setMessage(e.message);
                res.status(403);
            }
            else if (e instanceof securepath_api_1.CredentialsException) {
                _this.setCode(StatusCode.INVALID_ACTION);
                _this.setMessage("Invalid credentails");
                res.status(403);
            }
            else {
                console.error(e);
                _this.setMessage(e.message);
                res.status(500);
            }
        };
        this.handleExpressSuccess = function (message, res) {
            _this.setMessage(message);
            _this.setCode(StatusCode.OK);
            _this.setSuccess(true);
            res.status(200);
        };
        this.toObject = function () {
            return __assign({ data: _this.data }, _this.meta);
        };
    }
    return ResponseBuilder;
}());
exports.ResponseBuilder = ResponseBuilder;
