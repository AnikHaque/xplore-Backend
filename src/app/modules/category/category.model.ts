import { Schema, model } from 'mongoose';
import { LocationEnum } from '../service/service.constants';

// room Schema
const CategorySchema = new Schema(
  {
    category: {
      type: String,
      enum: LocationEnum,
      require: true,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const Category = model('Category', CategorySchema);
