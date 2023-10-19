import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title id is required',
    }),
    description: z.string({
      required_error: 'description id is required',
    }),
  }),
});
const faq = z.object({
  body: z.object({
    question: z.string({
      required_error: 'question id is required',
    }),
    answer: z.string({
      required_error: 'answer  id is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string({}).optional(),
    description: z.string({}).optional(),
  }),
});

export const BlogValidation = {
  create,
  update,
  faq,
};
