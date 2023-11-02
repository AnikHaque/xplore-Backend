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
exports.BookingController = void 0;
const AsyncCatch_1 = __importDefault(require("../../../shared/AsyncCatch"));
const booking_service_1 = require("./booking.service");
const ProviceResponse_1 = __importDefault(require("../../../shared/ProviceResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const booking_constants_1 = require("./booking.constants");
const createBooking = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = __rest(req.body, []);
    const result = yield booking_service_1.BookingServices.createBooking(bookingData);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Added Successful",
        data: result,
    });
}));
const getBooking = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pagOptions = (0, pick_1.default)(req.query, booking_constants_1.bookingPaginationOptions);
    const result = yield booking_service_1.BookingServices.getBooking(pagOptions);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Fetched Successful",
        meta: result.meta,
        data: result.data,
    });
}));
const getUserByBooking = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pagOptions = (0, pick_1.default)(req.query, booking_constants_1.bookingPaginationOptions);
    const user = req.user;
    const result = yield booking_service_1.BookingServices.getUserByBooking(pagOptions, user);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Fetched Successful",
        meta: result.meta,
        data: result.data,
    });
}));
const updateBookingByStatus = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const status = req.body;
    const result = yield booking_service_1.BookingServices.updateBookingByStatus(status, id);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Status Update Successful",
        data: result,
    });
}));
const updateBookingSchedule = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const schedule = req.body;
    const result = yield booking_service_1.BookingServices.updateBookingSchedule(schedule, id);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Schedule Update Successful",
        data: result,
    });
}));
const deleteBooking = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.BookingServices.deleteBooking(id);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Deleted Successful",
        data: result,
    });
}));
exports.BookingController = {
    createBooking,
    deleteBooking,
    getBooking,
    getUserByBooking,
    updateBookingByStatus,
    updateBookingSchedule,
};
