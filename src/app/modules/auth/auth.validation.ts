import { z } from "zod";

const createZodValidate = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 5 or more characters long" })
      .max(16, { message: "Must be 5 or fewer characters long" }),
    role: z.enum(["admin", "super_admin", "tourist"], {
      required_error: "Role not match",
    }),
    phone: z.string({ required_error: "Phone number is required" }).optional(),
    address: z.string({ required_error: "Address is required" }).optional(),
    image: z.string({ required_error: "Image number is required" }).optional(),
  }),
});

const loginZodValidate = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 5 or more characters long" })
      .max(16, { message: "Must be 5 or fewer characters long" }),
  }),
});

export const AuthValidator = {
  createZodValidate,
  loginZodValidate,
};
