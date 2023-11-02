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
exports.userServices = void 0;
const prisma_1 = __importDefault(require("../../instance/prisma"));
const paginationHandler_1 = require("../../../handler/paginationHandler");
const user_constants_1 = require("./user.constants");
const getUserProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user.email;
    const result = yield prisma_1.default.user.findFirst({
        where: {
            email,
        },
    });
    return result;
});
const getAllUser = (pagOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHandler_1.paginationHelpers.calculatePagination(pagOptions);
    const { searchTerm, role } = filters;
    const whereConditions = {};
    if (searchTerm) {
        whereConditions.OR = user_constants_1.userSearchableFields.map((field) => ({
            [field]: {
                contains: searchTerm,
                mode: "insensitive",
            },
        }));
    }
    if (role) {
        whereConditions.role = {
            equals: role,
        };
    }
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    const total = yield prisma_1.default.user.count({});
    return {
        meta: {
            total,
            limit,
            page,
        },
        data: result,
    };
});
const getSingleUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findFirst({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleUserById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const updateUser = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const updateRole = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: role,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.userServices = {
    getUserProfile,
    updateUser,
    getAllUser,
    updateRole,
    getSingleUserById,
    updateSingleUserById,
    deleteUser,
};
