import { Prisma, Services } from "@prisma/client";
import prisma from "../../instance/prisma";
import {
  iGenericResponse,
  iPaginationOptions,
} from "../../../interfaces/common";
import { paginationHelpers } from "../../../handler/paginationHandler";
import { servicesSearchableFields } from "./services.constants";
import { iServicesOptions } from "./services.interface";

const createService = async (payload: Services): Promise<Services> => {
  const result = await prisma.services.create({
    data: payload,
    include: {
      review: {
        include: {
          user: true,
        },
      },
    },
  });

  return result;
};

const getServices = async (
  filters: iServicesOptions,
  pagOptions: iPaginationOptions
): Promise<iGenericResponse<Services[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(pagOptions);

  const {
    searchTerm,
    day,
    age,
    maxPrice,
    minPrice,
    availabilityType,
    location,
    month,
  } = filters;

  const whereConditions: Prisma.ServicesWhereInput = {};

  if (searchTerm) {
    whereConditions.OR = servicesSearchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));
  }

  if (day) {
    whereConditions.day = {
      lte: Number(day),
    };
  }

  if (age) {
    whereConditions.age = {
      lte: Number(age),
    };
  }

  if (maxPrice) {
    whereConditions.price = {
      lte: Number(maxPrice),
    };
  }

  if (minPrice) {
    whereConditions.price = {
      gte: Number(minPrice),
    };
  }

  if (availabilityType) {
    whereConditions.availabilityType = {
      equals: availabilityType,
    };
  }
  if (month) {
    whereConditions.how_month = {
      equals: month,
    };
  }

  if (location) {
    whereConditions.location = {
      equals: location,
    };
  }

  const result = await prisma.services.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      pagOptions.sortBy && pagOptions.sortOrder
        ? {
            [pagOptions.sortBy]: pagOptions.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.services.count();

  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  };
};

const getSingleService = async (id: string): Promise<Services | null> => {
  const result = await prisma.services.findUnique({
    where: {
      id,
    },
    include: {
      review: {
        include: {
          user: true,
        },
      },
    },
  });

  return result;
};

const updateService = async (
  id: string,
  payload: Partial<Services>
): Promise<Services | null> => {
  const result = await prisma.services.update({
    where: { id },
    data: payload,
    include: {
      review: {
        include: {
          user: true,
        },
      },
    },
  });

  return result;
};

const deleteService = async (id: string): Promise<Services> => {
  const result = await prisma.services.delete({
    where: { id },
    include: {
      review: {
        include: {
          user: true,
        },
      },
    },
  });

  return result;
};

export const ServicesService = {
  createService,
  getServices,
  getSingleService,
  updateService,
  deleteService,
};
