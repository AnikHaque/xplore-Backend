"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientError = (error) => {
    var _a;
    let errors = [];
    let message = "Record not found!";
    const statusCode = 400;
    if (error.code === "P2025") {
        if ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) {
            message = error.meta.cause;
        }
        errors = [{ path: "", message }];
    }
    else if (error.code === "P2003" &&
        error.message.includes("delete()` invocation:")) {
        message = "Delete failed";
        errors = [{ path: "", message }];
    }
    return {
        statusCode,
        message,
        errorMessages: errors,
    };
};
exports.default = handleClientError;
