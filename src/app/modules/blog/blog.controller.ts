import { Request, Response } from "express";
import AsyncCatch from "../../../shared/AsyncCatch";
import { BlogServices } from "./blog.service";
import ProvideResponse from "../../../shared/ProviceResponse";
import httpStatus from "http-status";

const createBlog = AsyncCatch(async (req: Request, res: Response) => {
  const { ...blogData } = req.body;

  const result = await BlogServices.createBlog(blogData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Created Successful",
    data: result,
  });
});

const getAllBlog = AsyncCatch(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlog();

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Fetched Successful",
    data: result,
  });
});

const getSingleBlog = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BlogServices.getSingleBlog(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Fetched Successful",
    data: result,
  });
});

const updateBlog = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updateData } = req.body;

  const result = await BlogServices.updateBlog(id, updateData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Updated Successful",
    data: result,
  });
});

const deleteBlog = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BlogServices.deleteBlog(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Deleted Successful",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
