"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const services_routes_1 = require("../modules/services/services.routes");
const reviews_routes_1 = require("../modules/reviews/reviews.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const user_routes_1 = require("../modules/user/user.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const blog_routes_1 = require("../modules/blog/blog.routes");
const faq_routes_1 = require("../modules/faq/faq.routes");
const router = express_1.default.Router();
const routes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/services",
        route: services_routes_1.ServicesRoutes,
    },
    {
        path: "/reviews",
        route: reviews_routes_1.ReviewsRoutes,
    },
    {
        path: "/booking",
        route: booking_routes_1.BookingRoutes,
    },
    {
        path: "/cart",
        route: cart_routes_1.CartRoutes,
    },
    {
        path: "/feedback",
        route: feedback_routes_1.FeedbackRoutes,
    },
    {
        path: "/blog",
        route: blog_routes_1.BlogRoutes,
    },
    {
        path: "/faq",
        route: faq_routes_1.FAQRoutes,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
