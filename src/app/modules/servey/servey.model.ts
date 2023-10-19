import { Schema, model } from 'mongoose';

const serveySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const Servey = model('Servey', serveySchema);
