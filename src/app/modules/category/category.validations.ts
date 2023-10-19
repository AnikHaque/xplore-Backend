import { z } from 'zod';
import { LocationEnum } from '../service/service.constants';

const create = z.object({
  body: z.object({
    category: z.enum(
      [...Object.values(LocationEnum)] as [string, ...string[]],

      { required_error: 'Name  is required' },
    ),
    // thumbnail: z.object({
    //   public_id: z.string({ required_error: 'Public id  is required' }),
    //   url: z.string({ required_error: 'Url  is required' }),
    // }),
    // thumbnail: z.string({
    //   required_error: 'Image  is required',
    // }),
  }),
});
const update = z.object({
  body: z.object({
    category: z
      .enum([...Object.values(LocationEnum)] as [string, ...string[]], {})
      .optional(),
  }),
});

export const CategoryValidation = {
  create,
  update,
};
