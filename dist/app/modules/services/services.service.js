"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const prisma_1 = __importDefault(require("../../instance/prisma"));
const paginationHandler_1 = require("../../../handler/paginationHandler");
const services_constants_1 = require("./services.constants");
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.create({
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
});
const getServices = (filters, pagOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHandler_1.paginationHelpers.calculatePagination(pagOptions);
    const { searchTerm, day, age, maxPrice, minPrice, availabilityType, location, month, } = filters;
    const whereConditions = {};
    if (searchTerm) {
        whereConditions.OR = services_constants_1.servicesSearchableFields.map((field) => ({
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
    const result = yield prisma_1.default.services.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: pagOptions.sortBy && pagOptions.sortOrder
            ? {
                [pagOptions.sortBy]: pagOptions.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.services.count();
    return {
        meta: {
            total,
            limit,
            page,
        },
        data: result,
    };
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.findUnique({
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
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.update({
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
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.delete({
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
});
exports.ServicesService = {
    createService,
    getServices,
    getSingleService,
    updateService,
    deleteService,
};
