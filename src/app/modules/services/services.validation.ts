import { z } from "zod";

const createServiceValidation = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    description: z.string({ required_error: "Title is required" }),
    image: z.string({ required_error: "Title is required" }),
    price: z.number({ required_error: "Price is required" }),
    personLimit: z.number({ required_error: "Price is required" }),
    contact: z.string({ required_error: "Title is required" }),
    location: z.string({ required_error: "Title is required" }),
    available: z.enum(["AVAILABLE", "UPCOMING"], {
      required_error: "Available is required",
    }),
    startDate: z.date({ required_error: "Date is required" }),
  }),
});

const updateServiceValidation = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }).optional(),
    description: z.string({ required_error: "Title is required" }).optional(),
    image: z.string({ required_error: "Title is required" }).optional(),
    price: z.number({ required_error: "Price is required" }).optional(),
    personLimit: z.number({ required_error: "Price is required" }).optional(),
    contact: z.string({ required_error: "Title is required" }).optional(),
    location: z.string({ required_error: "Title is required" }).optional(),
    startDate: z.date({ required_error: "Date is required" }).optional(),
  }),
});

export const ServicesValidation = {
  createServiceValidation,
  updateServiceValidation,
};
