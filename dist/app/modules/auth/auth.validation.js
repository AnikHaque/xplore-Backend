"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const zod_1 = require("zod");
const createZodValidate = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).optional(),
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email({ message: "Invalid email address" }),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, { message: "Must be 5 or more characters long" })
            .max(16, { message: "Must be 5 or fewer characters long" }),
        role: zod_1.z.enum(["admin", "super_admin", "tourist"], {
            required_error: "Role not match",
        }),
        phone: zod_1.z.string({ required_error: "Phone number is required" }).optional(),
        address: zod_1.z.string({ required_error: "Address is required" }).optional(),
        image: zod_1.z.string({ required_error: "Image number is required" }).optional(),
    }),
});
const loginZodValidate = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email({ message: "Invalid email address" }),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, { message: "Must be 5 or more characters long" })
            .max(16, { message: "Must be 5 or fewer characters long" }),
    }),
});
exports.AuthValidator = {
    createZodValidate,
    loginZodValidate,
};
