/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import cloudinary from 'cloudinary';
import { Cart, Service } from './service.model';
import { Category } from '../category/category.model';
import ApiError from '../../../errors/Apierror';
import {
  IAddAnswerData,
  IAddQuestionData,
  IAddReviewData,
  IReview,
  IServicesFilters,
} from './service.interface';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { servicesSearchableFields } from './service.constants';

import User from '../user/user.model';
import { SortOrder } from 'mongoose';

//!
const createService = async (payload: any) => {
  const categoryId = payload.category;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  const thumbnail = payload.thumbnail;
  if (thumbnail && typeof thumbnail === 'string') {
    const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
      folder: 'services',
    });
    payload.thumbnail = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const result = await (await Service.create(payload)).populate('category');

  category.services.push(result._id);
  await category.save();

  return result;
};
//!
const addToCart = async (payload: any) => {
  const { serviceId, userId } = payload;
  console.log(payload);
  const isExist = await Cart.findOne({ service: serviceId, user: userId });
  if (isExist) {
    throw new ApiError(400, 'Service already exists');
  }
  const data = {
    service: serviceId,
    user: userId,
  };
  const result = (await (await Cart.create(data)).populate('service')).populate(
    'user',
  );
  return result;
};
//!
const removeFromCart = async (id: string) => {
  const result = await Cart.findByIdAndDelete(id);
  return result;
};
//!
const getMyCart = async (payload: any) => {
  const { userId } = payload;

  const result = await Cart.findOne({ user: userId })
    .populate('service')
    .populate('user');

  return result;
};
//!
// const getAllService = async (
//   filters: IServicesFilters,
//   paginationOptions: IPaginationOptions,
// ): Promise<IGenericResponse<any[]>> => {
//   const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       $or: servicesSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   const sortConditions: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }

//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await Service.find(whereConditions)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit)
//     .populate('category');

//   const total = await Service.countDocuments(whereConditions);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };
//!
const getAllService = async (
  filters: IServicesFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<any[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  // console.log(minPrice);
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const whereConditions: any = {};

  if (searchTerm) {
    whereConditions.$or = servicesSearchableFields.map(field => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    }));
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    whereConditions.price = {};

    if (minPrice !== undefined) {
      whereConditions.price.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      whereConditions.price.$lte = maxPrice;
    }
  }
  if (Object.keys(filtersData).length) {
    Object.entries(filtersData).forEach(([field, value]) => {
      whereConditions[field] = value;
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Service.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('category');

  const total = await Service.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//!
const getSingleService = async (id: string) => {
  const service = await Service.findById(id)
    .populate('category')
    .populate('reviews.user')
    .populate('questions.user');
  return service;
};
//!
const addReviewInService = async (body: any, serviceId: string) => {
  const { rating, review, user }: IAddReviewData = body;
  // console.log(body);
  const service = await Service.findById(serviceId)
    .populate('reviews.user')
    .exec();
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }
  const reviewData: any = {
    user: user,
    rating,
    comment: review,
  };
  console.log(reviewData);
  const reviews: IReview[] = (service?.reviews || []) as unknown as IReview[];
  reviews.push(reviewData);
  let avg = 0;
  reviews.forEach((rev: any) => {
    avg += rev.rating;
  });
  if (service) {
    service.ratings = avg / reviews.length;
  }
  await service?.save();
  return service;
};
//!
//add question
const addQuestion = async (body: any, serviceId: string) => {
  const { question, user }: IAddQuestionData = body;
  const service = await Service.findById(serviceId).populate('questions.user');

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  const newQuestion: any = {
    user: user,
    question,
    questionReply: [],
  };

  service.questions.push(newQuestion);
  await service?.save();
  // await Notification.create({
  //   user: user?._id,
  //   title: 'New Booking',
  //   message: `You have a new order from ${service?.propertyName}`,
  // });
  return service;
};
//!
// add answer to question course
const addQuestionAnswer = async (body: any, serviceId: string, userId: any) => {
  const { answer, questionId }: IAddAnswerData = body;

  const user = await User.findById(userId.userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  const question = service?.questions?.find((item: any) =>
    item._id.equals(questionId),
  );
  // console.log(question.user);
  if (!question) {
    throw new ApiError(400, 'Invalid question id');
  }

  const newAnswer: any = {
    user: user,
    answer,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  question.questionReplies.push(newAnswer);
  await service?.save();
  //@ts-ignore

  return service;
};
//!
//!
const deleteService = async (id: string) => {
  try {
    const deletedService = await Service.findByIdAndRemove(id);
    if (!deletedService) {
      throw new ApiError(404, 'Service not found or could not be deleted');
    }
    const categoryId = deletedService.category;

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (category) {
        category.services = category.services.filter(
          serviceId => serviceId.toString() !== id,
        );
        await category.save();
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const ServicesService = {
  createService,
  getSingleService,
  getAllService,
  addReviewInService,
  addQuestion,
  addQuestionAnswer,
  deleteService,
  addToCart,
  removeFromCart,
  getMyCart,
};
