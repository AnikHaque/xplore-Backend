import express from 'express';
import { BookingController } from './booking.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingValidation } from './booking.validations';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getAllBookings,
);

router.post(
  '/',
  validateRequest(BookingValidation.create),
  auth(ENUM_USER_ROLE.USER),
  BookingController.insertIntoDB,
);
router.get(
  '/my-bookings',
  auth(ENUM_USER_ROLE.USER),
  BookingController.myBookings,
);
router.get('/:id', BookingController.getSIngleBooking);
router.delete(
  '/cancel-bookings',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  BookingController.cancelBooking,
);
router.patch(
  '/update-booking/:id',
  validateRequest(BookingValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.updateBooking,
);
export const BookingRoutes = router;
