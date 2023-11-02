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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const prisma_1 = __importDefault(require("../../instance/prisma"));
const paginationHandler_1 = require("../../../handler/paginationHandler");
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = payload, others = __rest(payload, ["serviceId"]);
    const result = serviceId.map((service) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.default.booking.create({
            data: Object.assign(Object.assign({}, others), { serviceId: service }),
        });
    }));
    return result;
});
const getBooking = (pagOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHandler_1.paginationHelpers.calculatePagination(pagOptions);
    const result = yield prisma_1.default.booking.findMany({
        skip,
        take: limit,
        include: {
            service: true,
            user: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const total = yield prisma_1.default.booking.count();
    return {
        meta: {
            total,
            limit,
            page,
        },
        data: result,
    };
});
const getUserByBooking = (pagOptions, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHandler_1.paginationHelpers.calculatePagination(pagOptions);
    const result = yield prisma_1.default.booking.findMany({
        where: {
            user: {
                id: user.id,
            },
        },
        include: {
            service: true,
            user: true,
        },
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    const total = yield prisma_1.default.booking.count({
        where: {
            user: {
                id: user.id,
            },
        },
    });
    return {
        meta: {
            total,
            limit,
            page,
        },
        data: result,
    };
});
const updateBookingByStatus = (status, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
        where: { id },
        data: status,
    });
    return result;
});
const updateBookingSchedule = (schedule, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
        where: { id },
        data: schedule,
    });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
        where: { id },
    });
    return result;
});
exports.BookingServices = {
    createBooking,
    deleteBooking,
    getBooking,
    getUserByBooking,
    updateBookingByStatus,
    updateBookingSchedule,
};
