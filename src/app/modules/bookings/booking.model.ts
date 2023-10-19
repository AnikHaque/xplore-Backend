import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },
    room: {
      type: Number,
      default: 1,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'adjusted'],
      default: 'pending',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const Booking = model('Booking', bookingSchema);
