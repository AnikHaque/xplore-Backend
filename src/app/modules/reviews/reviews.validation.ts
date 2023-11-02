import { z } from "zod";

const createReviewValidation = z.object({
  body: z.object({
    scale: z.number({ required_error: "Scale is required" }),
    description: z.string({ required_error: "Description is required" }),
  }),
});

export const ReviewsValidation = {
  createReviewValidation,
};
