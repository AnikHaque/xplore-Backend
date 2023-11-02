import { Request, Response } from "express";
import AsyncCatch from "../../../shared/AsyncCatch";
import ProvideResponse from "../../../shared/ProviceResponse";
import httpStatus from "http-status";
import { FAQServices } from "./faq.service";

const createFAQ = AsyncCatch(async (req: Request, res: Response) => {
  const { ...blogData } = req.body;

  const result = await FAQServices.createFAQ(blogData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FAQ Created Successful",
    data: result,
  });
});

const getAllFAQ = AsyncCatch(async (req: Request, res: Response) => {
  const result = await FAQServices.getAllFAQ();

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FAQ Fetched Successful",
    data: result,
  });
});

const getSingleFAQ = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FAQServices.getSingleFAQ(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FAQ Fetched Successful",
    data: result,
  });
});

const updateFAQ = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updateData } = req.body;

  const result = await FAQServices.updateFAQ(id, updateData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FAQ Updated Successful",
    data: result,
  });
});

const deleteFAQ = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FAQServices.deleteFAQ(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FAQ Deleted Successful",
    data: result,
  });
});

export const FAQController = {
  createFAQ,
  getAllFAQ,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
};
