import { z } from "zod";

const createBookingValidation = z.object({
  body: z.object({
    date_from: z.date({ required_error: "Date is required" }),
    date_to: z.date({ required_error: "Date is required" }),
    member: z.number({ required_error: "Member is required" }),
    how_day: z.number({ required_error: "Days is required" }),
  }),
});

export const BookingValidation = {
  createBookingValidation,
};
