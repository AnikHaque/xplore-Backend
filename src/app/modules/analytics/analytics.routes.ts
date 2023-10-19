import express from 'express';

import { AnalyticsController } from './analytics.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/get-users-analytics',
  auth(ENUM_USER_ROLE.ADMIN),
  AnalyticsController.getUsersAnalytics,
);
router.get(
  '/get-services-analytics',
  auth(ENUM_USER_ROLE.ADMIN),
  AnalyticsController.getCourseAnalytics,
);
router.get(
  '/get-bookings-analytics',
  auth(ENUM_USER_ROLE.ADMIN),
  AnalyticsController.getOrdersAnalytics,
);

export const AnalyticsRoutes = router;
