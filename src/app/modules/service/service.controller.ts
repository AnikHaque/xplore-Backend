/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import cloudinary from 'cloudinary';
import sendResponse from '../../../shared/sendResponse';
import { ServicesService } from './service.service';
import { Service } from './service.model';
import pick from '../../../shared/pick';
import { servicesFilterableFields } from './service.constants';
import paginationFields from '../../../constants/pagination';

//!
const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await ServicesService.createService(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Service created successfully`,
      data: result,
    });
  },
);
//!
const addToCart: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await ServicesService.addToCart(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Add to cart successfully`,
      data: result,
    });
  },
);
//!
const removeFromCart: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ServicesService.removeFromCart(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `remove from cart successfully`,
      data: result,
    });
  },
);
//!
const getMyCart: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await ServicesService.getMyCart(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Retrieved cart successfully`,
      data: result,
    });
  },
);
//!
//!
const updateService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body?.serviceData;
    const thumbnail = data?.thumbnail;
    const serviceId = req.params.id;
    const serviceData = (await Service.findById(serviceId)) as any;

    if (
      thumbnail &&
      typeof thumbnail === 'string' &&
      !thumbnail.startsWith('https')
    ) {
      if (serviceData?.thumbnail?.public_id) {
        await cloudinary.v2.uploader.destroy(serviceData?.thumbnail?.public_id);
      }

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: 'Service',
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else if (!thumbnail && serviceData?.thumbnail?.public_id) {
      // If there's no new thumbnail but there's an existing public_id, retain the old image.
      data.thumbnail = {
        public_id: serviceData?.thumbnail.public_id,
        url: serviceData?.thumbnail.url,
      };
    }

    const service = await Service.findByIdAndUpdate(
      serviceId,
      {
        $set: data,
      },
      {
        new: true,
      },
    ).populate('category');

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  },
);

//!
const getAllService = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, servicesFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServicesService.getAllService(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
//!
const getSingleService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ServicesService.getSingleService(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Service retrieved by id successfully`,
      data: result,
    });
  },
);
//!

//!
//add review in course
const addReviewInService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body;
    const serviceId = req.params.id;

    const result = await ServicesService.addReviewInService(body, serviceId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Review added successfully`,
      data: result,
    });
  },
);
//!
//add question
const addQuestion: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body;
    const serviceId = req.params.id;
    // const user = req.user;
    const result = await ServicesService.addQuestion(body, serviceId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Question added successfully`,
      data: result,
    });
  },
);
//!
//add answer in course question
const addQuestionAnswer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body;
    const serviceId = req.params.id;
    const user = req.user;
    const result = await ServicesService.addQuestionAnswer(
      body,
      serviceId,
      user,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Question answer successfully`,
      data: result,
    });
  },
);
//!
//!
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ServicesService.deleteService(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});
//!
export const ServiceController = {
  createService,
  addToCart,
  updateService,
  getSingleService,
  getAllService,
  addReviewInService,
  addQuestion,
  addQuestionAnswer,
  deleteService,
  removeFromCart,
  getMyCart,
};
