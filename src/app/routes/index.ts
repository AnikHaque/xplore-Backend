import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ServiceRoutes } from '../modules/service/service.routes';

import { BookingRoutes } from '../modules/bookings/booking.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { LayoutRoutes } from '../modules/layouts/layouts.routes';
import { AnalyticsRoutes } from '../modules/analytics/analytics.routes';
import { ServeyRoutes } from '../modules/servey/servey.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/layouts',
    route: LayoutRoutes,
  },
  {
    path: '/analytics',
    route: AnalyticsRoutes,
  },
  {
    path: '/servey',
    route: ServeyRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
