"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AxiosHelpers = /** @class */ (function () {
    function AxiosHelpers() {
    }
    AxiosHelpers.isResponseHtml = function (response) {
        var contentType = response.headers["Content-Type"];
        if (contentType.search("text/html") < 0) {
            return false;
        }
        return true;
    };
    AxiosHelpers.isSecurepathForbidden = function (response) {
        if (response.data.search("Redirecting to login page .. Please wait") < 0) {
            return true;
        }
        return false;
    };
    return AxiosHelpers;
}());
exports.AxiosHelpers = AxiosHelpers;
