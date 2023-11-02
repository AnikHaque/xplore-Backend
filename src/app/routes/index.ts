import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ServicesRoutes } from "../modules/services/services.routes";
import { ReviewsRoutes } from "../modules/reviews/reviews.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";
import { CartRoutes } from "../modules/cart/cart.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { FeedbackRoutes } from "../modules/feedback/feedback.routes";
import { BlogRoutes } from "../modules/blog/blog.routes";
import { FAQRoutes } from "../modules/faq/faq.routes";

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServicesRoutes,
  },
  {
    path: "/reviews",
    route: ReviewsRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/feedback",
    route: FeedbackRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/faq",
    route: FAQRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
