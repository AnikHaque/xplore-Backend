import { Request, RequestHandler, Response } from 'express';

import sendResponse from '../../../shared/sendResponse';
import { LayoutService } from './layouts.service';
import catchAsync from '../../../shared/catchasync';
import paginationFields from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { blogFilterableFields } from './layout.constants';
import { IBlog } from './layouts.interface';
import { FAQ } from './layouts.model';

//create Layout only for admin
const createLayout: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    await LayoutService.createLayout(req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Layout create successful',
    });
  },
);
//!
const createBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await LayoutService.createBlog(data);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Blog create successful',
      data: result,
    });
  },
);
//!
const updateBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const id = req.params.id;
    const result = await LayoutService.updateBlog(data, id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Blog Updated successful',
      data: result,
    });
  },
);
//!
//create Layout only for admin
const updateLayout: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    await LayoutService.updateLayout(req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Layout updated successful',
    });
  },
);
//!
//create Layout only for admin
const getLayoutByType: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LayoutService.getLayoutByType(req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Layout retrieved successful',
      data: result,
    });
  },
);
//!
//get Layout only for admin
const getBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, blogFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);
    const result = await LayoutService.getBlog(filters, paginationOptions);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Blog retrieved successful',
      data: result,
    });
  },
);
//!
//get Layout only for admin
const getBlogById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await LayoutService.getBlogById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Blog retrieved by id successful',
      data: result,
    });
  },
);
//!
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await LayoutService.deleteBlog(id);
  sendResponse<IBlog>(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});
//!
// Create a new FAQ entry
const createFAQ: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await FAQ.create(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faq create successful',
      data: result,
    });
  },
);
// Get all FAQ entries
const getAllFAQs: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FAQ.find();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faq retrieved successful',
      data: result,
    });
  },
);
export const LayoutController = {
  createLayout,
  updateLayout,
  getLayoutByType,
  createBlog,
  updateBlog,
  getBlog,
  getBlogById,
  deleteBlog,
  createFAQ,
  getAllFAQs,
};
