"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const AuthGuard_1 = require("../../../enums/AuthGuard");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.TOURIST), booking_controller_1.BookingController.createBooking);
router.get("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN), booking_controller_1.BookingController.getBooking);
router.get("/user-by", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.TOURIST), booking_controller_1.BookingController.getUserByBooking);
router.patch("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN), booking_controller_1.BookingController.updateBookingByStatus);
router.patch("/schedule/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN), booking_controller_1.BookingController.updateBookingSchedule);
router.delete("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.TOURIST), booking_controller_1.BookingController.deleteBooking);
exports.BookingRoutes = router;
