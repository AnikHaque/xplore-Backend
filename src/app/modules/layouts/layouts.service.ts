/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import cloudinary from 'cloudinary';
import Layout, { Blog } from './layouts.model';
import ApiError from '../../../errors/Apierror';
import { IPaginationOptions } from '../../../interfaces/paginations';
import { IBlog, IBlogFilters } from './layouts.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { blogSearchableFields } from './layout.constants';
import { SortOrder } from 'mongoose';

const createLayout = async (req: Request) => {
  const { type } = req.body;
  const isExist = await Layout.findOne({ type });
  if (isExist) {
    throw new ApiError(400, `${type} is already exist`);
  }
  if (type === 'Banner') {
    const { image, title, subTitle } = req.body;
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: 'layout',
    });
    const banner = {
      type: 'Banner',

      banner: {
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        title,
        subTitle,
      },
    };
    await Layout.create(banner);
  }
  if (type === 'FAQ') {
    const { faq } = req.body;
    const faqItems = await Promise.all(
      faq.map(async (item: any) => {
        return {
          question: item.question,
          answer: item.answer,
        };
      }),
    );
    await Layout.create({ type: 'FAQ', faq: faqItems });
  }
  if (type === 'Categories') {
    const { categories } = req.body;
    const categoriesItem = await Promise.all(
      categories.map(async (item: any) => {
        return {
          title: item.title,
        };
      }),
    );
    await Layout.create({ type: 'Categories', categories: categoriesItem });
  }
};
//!
const createBlog = async (payload: any) => {
  const avatar = payload.avatar;
  if (avatar && typeof avatar === 'string') {
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: 'blog',
    });
    payload.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const result = await Blog.create(payload);
  return result;
};
//!
const updateBlog = async (data: any, blogId: any) => {
  const avatar = data.avatar;

  const isBlog = await Blog.findById(blogId);
  if (!isBlog) {
    throw new ApiError(404, 'Blog not found');
  }

  const serviceData = (await Blog.findById(blogId)) as any;

  if (avatar && !avatar.startsWith('https')) {
    await cloudinary.v2.uploader.destroy(serviceData.avatar.public_url);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: 'blog',
    });
    data.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
    if (avatar.startsWith('https')) {
      data.avatar = {
        public_id: serviceData?.avatar.public_id,
        url: serviceData?.avatar.url,
      };
    }
  }

  const blog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $set: data,
    },
    {
      new: true,
    },
  );
  return blog;
};
//!
const updateLayout = async (req: Request) => {
  const { type } = req.body;

  if (type === 'Banner') {
    const bannerData: any = await Layout.findOne({ type: 'Banner' });
    const { image, title, subTitle } = req.body;
    const data = image.startsWith('https')
      ? bannerData
      : await cloudinary.v2.uploader.upload(image, {
          folder: 'layout',
        });

    // const myCloud = await cloudinary.v2.uploader.upload(image, {
    //   folder: "layout",
    // });
    const banner = {
      type: 'Banner',
      image: {
        public_id: image.startsWith('https')
          ? bannerData.banner.image.public_id
          : data?.public_id,
        url: image.startsWith('https')
          ? bannerData.banner.image.url
          : data?.secure_url,
      },
      title,
      subTitle,
    };

    await Layout.findByIdAndUpdate(bannerData._id, { banner });
  }
  if (type === 'FAQ') {
    const { faq } = req.body;
    const faqItem = await Layout.findOne({ type: 'FAQ' });

    const faqItems = await Promise.all(
      faq.map(async (item: any) => {
        return {
          question: item.question,
          answer: item.answer,
        };
      }),
    );
    await Layout.findByIdAndUpdate(faqItem?._id, {
      type: 'FAQ',
      faq: faqItems,
    });
  }
  if (type === 'Categories') {
    const { categories } = req.body;
    const categoriesItem = await Layout.findOne({ type: 'Categories' });
    const categoriesItems = await Promise.all(
      categories.map(async (item: any) => {
        return {
          title: item.title,
        };
      }),
    );
    await Layout.findByIdAndUpdate(categoriesItem?._id, {
      type: 'Categories',
      categories: categoriesItems,
    });
  }
};
//!
const getLayoutByType = async (req: Request) => {
  const { type } = req.params;
  const layout = await Layout.findOne({ type });
  return layout;
};
//!
const getBlog = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions,
) => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: blogSearchableFields.map(field => ({
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

  const result = await Blog.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(whereConditions);

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
const getBlogById = async (id: any) => {
  const layout = await Blog.findById(id);
  return layout;
};
//!
//!
const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id);

  return result;
};
export const LayoutService = {
  createLayout,
  updateLayout,
  getLayoutByType,
  createBlog,
  updateBlog,
  getBlog,
  getBlogById,
  deleteBlog,
};
