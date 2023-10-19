import { Schema, model } from 'mongoose';

import { IComment } from './service.interface';

const reviewSchema = new Schema(
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
const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    question: String,
    questionReplies: [Object],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
const ServiceSchema = new Schema(
  {
    propertyName: {
      type: String,
      required: [true, 'propertyName is required'],
    },
    propertyLocation: {
      type: String,
      require: true,
    },
    roomTitle: {
      type: String,
      required: [true, 'roomTitle is required'],
    },
    bedTitle: {
      type: String,
      required: [true, 'bedTitle is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    propertyDetails: {
      type: String,
      required: [true, 'propertyDetails is required'],
    },
    availability: {
      type: String,
      enum: ['Available', 'Unavailable'],
      default: 'Available',
    },
    numberOfGuest: {
      type: String,
      required: [true, 'numberOfGuest is required'],
    },
    houseRules: {
      type: String,
      required: [true, 'houseRules is required'],
    },

    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    facilities: {
      type: String,
      required: [true, 'facilities is required'],
    },
    reviews: [reviewSchema],
    questions: [commentSchema],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'in-progress'],
      default: 'in-progress',
    },
    ratings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
const addToCartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Service = model('Service', ServiceSchema);
export const Cart = model('Cart', addToCartSchema);
