/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from 'cloudinary';
import { Category } from './category.model';
import { ICategoryFilters } from './category.interface';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { categorySearchableFields } from './category.constants';
import mongoose, { SortOrder } from 'mongoose';
import { Service } from '../service/service.model';
import ApiError from '../../../errors/Apierror';
import { asyncForEach } from '../../../utils/utils';

//!
const createCategory = async (payload: any) => {
  const isExist = await Category.findOne({ category: payload.category });
  if (isExist) {
    throw new ApiError(400, 'Category already exists');
  }
  const thumbnail = payload.thumbnail;

  if (thumbnail && typeof thumbnail === 'string') {
    const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
      folder: 'category',
    });
    payload.thumbnail = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const result = await Category.create(payload);
  return result;
};
//!
const getAllCategory = async (
  filters: ICategoryFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<any[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: categorySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Category.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments(whereConditions);

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

const deleteCategory = async (id: string) => {
  const category = await Category.findById(id);
  const categoryId = category?._id;
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  const services = await Service.find({ category: id });
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await asyncForEach(services, async (data: any) => {
      await Service.deleteMany({ category: data.category });
    });
    await Category.findByIdAndDelete(categoryId);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
    throw error;
  }
};
//!
//!
const getSIngleCategory = async (id: string) => {
  const service = await Category.findById(id);
  return service;
};
export const CategoryService = {
  createCategory,
  getAllCategory,
  deleteCategory,
  getSIngleCategory,
};
