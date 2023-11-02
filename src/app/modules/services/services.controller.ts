import { Request, Response } from "express";
import AsyncCatch from "../../../shared/AsyncCatch";
import ProvideResponse from "../../../shared/ProviceResponse";
import httpStatus from "http-status";
import { ServicesService } from "./services.service";
import pick from "../../../shared/pick";
import {
  servicesFilterableFields,
  servicesPaginationOptions,
} from "./services.constants";

const createService = AsyncCatch(async (req: Request, res: Response) => {
  const { ...serviceData } = req.body;

  const result = await ServicesService.createService(serviceData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Created Successful",
    data: result,
  });
});

const getServices = AsyncCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, servicesFilterableFields);
  const pagOptions = pick(req.query, servicesPaginationOptions);

  const result = await ServicesService.getServices(filters, pagOptions);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Fetch Successful",
    data: result,
  });
});

const getSingleService = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ServicesService.getSingleService(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Fetch Successful",
    data: result,
  });
});

const updateService = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updateData } = req.body;

  const result = await ServicesService.updateService(id, updateData);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Updated Successful",
    data: result,
  });
});

const deleteService = AsyncCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ServicesService.deleteService(id);

  ProvideResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Deleted Successful",
    data: result,
  });
});

export const ServicesController = {
  createService,
  getServices,
  getSingleService,
  updateService,
  deleteService,
};
