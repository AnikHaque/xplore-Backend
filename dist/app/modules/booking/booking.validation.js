"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        date_from: zod_1.z.date({ required_error: "Date is required" }),
        date_to: zod_1.z.date({ required_error: "Date is required" }),
        member: zod_1.z.number({ required_error: "Member is required" }),
        how_day: zod_1.z.number({ required_error: "Days is required" }),
    }),
});
exports.BookingValidation = {
    createBookingValidation,
};
