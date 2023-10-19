import { z } from 'zod';

const create = z.object({
  body: z.object({
    propertyName: z.string({
      required_error: 'propertyName  is required',
    }),

    roomTitle: z.string({
      required_error: 'roomTitle summery is required',
    }),
    bedTitle: z.string({
      required_error: 'bedTitle id is required',
    }),
    price: z.number({
      required_error: 'price id is required',
    }),
    propertyDetails: z.string({
      required_error: 'propertyDetails id is required',
    }),

    numberOfGuest: z.string({
      required_error: 'numberOfGuest id is required',
    }),
    houseRules: z.string({
      required_error: 'houseRules is required',
    }),

    propertyLocation: z.string({
      required_error: 'Property Location is required',
    }),
    // thumbnail: z.object({
    //   public_id: z.string({ required_error: 'Public id  is required' }),
    //   url: z.string({ required_error: 'Url  is required' }),
    // }),
    facilities: z.string({
      required_error: 'facilities id is required',
    }),
    category: z.string({
      required_error: 'category id is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    propertyName: z.string({}).optional(),
    roomTitle: z.string({}).optional(),
    bedTitle: z.string({}).optional(),
    price: z.number({}).optional(),
    propertyDetails: z.string({}).optional(),
    numberOfGuest: z.string({}).optional(),
    houseRules: z.string({}).optional(),
    propertyLocation: z.string({}).optional(),

    availablity: z
      .enum([...Object.values(['Available', 'Unavailable'])] as [
        string,
        ...string[],
      ])
      .optional(),
    // thumbnail: z
    //   .object({
    //     public_id: z.string({}).optional(),
    //     url: z.string({}).optional(),
    //   })
    //   .optional(),
    facilities: z.string({}).optional(),
    category: z.string({}).optional(),
  }),
});

export const ServiceValidation = {
  create,
  update,
};
