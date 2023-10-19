/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IRoom } from '../category/category.interface';

type LocationEnum =
  | 'Cox Bazar'
  | 'Dhaka'
  | 'Sylhet'
  | 'Chittagong'
  | 'Sreemangal'
  | 'Kuakata'
  | 'Rajshahi'
  | 'Bandarban'
  | 'Gazipur'
  | 'Khulna';

type Review = {
  user: Types.ObjectId | IUser;
  rating: number;
  comment?: string;
  commentReplies: Array<Record<string, any>>;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Service = {
  name: string;
  location: LocationEnum;
  thumbnail: {
    public_id?: string;
    url?: string;
  };
  facilities: Array<{ title: string }>;
  ratings: Array<Review>;
  // rooms: Array<string>;
  rooms: Types.ObjectId | IRoom;
  createdAt?: Date;
  updatedAt?: Date;
};
export type IServicesFilters = {
  searchTerm?: string;
  category?: string;
  propertyLocation?: string;
  price?: string;
  minPrice?: string;
  maxPrice?: string;
};
export type IAddReviewData = {
  review: string;
  serviceId: string;
  rating: string;
  user: Types.ObjectId | IUser;
};

export type IReview = {
  user: IUser;
  rating: number;
  comment: string;
};

export type IComment = {
  user: IUser;
  question: string;
  questionReplies: IComment[];
};

export type IAddQuestionData = {
  question: string;
  user: Types.ObjectId | IUser;
  // serviceId: string;
};
export type IAddAnswerData = {
  answer: string;
  // serviceId: string;
  questionId: string;
};
