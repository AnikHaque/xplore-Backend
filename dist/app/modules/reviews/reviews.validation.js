"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsValidation = void 0;
const zod_1 = require("zod");
const createReviewValidation = zod_1.z.object({
    body: zod_1.z.object({
        scale: zod_1.z.number({ required_error: "Scale is required" }),
        description: zod_1.z.string({ required_error: "Description is required" }),
    }),
});
exports.ReviewsValidation = {
    createReviewValidation,
};
