import express from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middleware/auth";
import { EAuthGuardRoles } from "../../../enums/AuthGuard";

const router = express.Router();

router.post(
  "/",
  auth(
    EAuthGuardRoles.ADMIN,
    EAuthGuardRoles.SUPER_ADMIN,
    EAuthGuardRoles.TOURIST
  ),
  BookingController.createBooking
);

router.get(
  "/",
  auth(EAuthGuardRoles.ADMIN, EAuthGuardRoles.SUPER_ADMIN),
  BookingController.getBooking
);
router.get(
  "/user-by",
  auth(EAuthGuardRoles.TOURIST),
  BookingController.getUserByBooking
);

router.patch(
  "/:id",
  auth(EAuthGuardRoles.ADMIN, EAuthGuardRoles.SUPER_ADMIN),
  BookingController.updateBookingByStatus
);

router.patch(
  "/schedule/:id",
  auth(EAuthGuardRoles.ADMIN, EAuthGuardRoles.SUPER_ADMIN),
  BookingController.updateBookingSchedule
);

router.delete(
  "/:id",
  auth(
    EAuthGuardRoles.ADMIN,
    EAuthGuardRoles.SUPER_ADMIN,
    EAuthGuardRoles.TOURIST
  ),
  BookingController.deleteBooking
);

export const BookingRoutes = router;
