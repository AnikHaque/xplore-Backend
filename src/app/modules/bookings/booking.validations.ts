import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({ required_error: 'Start Date  is required' }),
    endDate: z.string({ required_error: 'End Date  is required' }),
  }),
});
const update = z.object({
  body: z.object({
    status: z
      .enum([
        ...Object.values(['pending', 'accepted', 'rejected', 'adjusted']),
      ] as [string, ...string[]])
      .optional(),
  }),
});

export const BookingValidation = {
  create,
  update,
};
