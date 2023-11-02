"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesValidation = void 0;
const zod_1 = require("zod");
const createServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" }),
        description: zod_1.z.string({ required_error: "Title is required" }),
        image: zod_1.z.string({ required_error: "Title is required" }),
        price: zod_1.z.number({ required_error: "Price is required" }),
        personLimit: zod_1.z.number({ required_error: "Price is required" }),
        contact: zod_1.z.string({ required_error: "Title is required" }),
        location: zod_1.z.string({ required_error: "Title is required" }),
        available: zod_1.z.enum(["AVAILABLE", "UPCOMING"], {
            required_error: "Available is required",
        }),
        startDate: zod_1.z.date({ required_error: "Date is required" }),
    }),
});
const updateServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" }).optional(),
        description: zod_1.z.string({ required_error: "Title is required" }).optional(),
        image: zod_1.z.string({ required_error: "Title is required" }).optional(),
        price: zod_1.z.number({ required_error: "Price is required" }).optional(),
        personLimit: zod_1.z.number({ required_error: "Price is required" }).optional(),
        contact: zod_1.z.string({ required_error: "Title is required" }).optional(),
        location: zod_1.z.string({ required_error: "Title is required" }).optional(),
        startDate: zod_1.z.date({ required_error: "Date is required" }).optional(),
    }),
});
exports.ServicesValidation = {
    createServiceValidation,
    updateServiceValidation,
};
