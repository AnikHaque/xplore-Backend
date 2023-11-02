"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProvideResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        access_token: data.access_token || null || undefined,
        refresh_token: data.refresh_token || null || undefined,
        data: data.data || null || undefined,
        meta: data.meta || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = ProvideResponse;
