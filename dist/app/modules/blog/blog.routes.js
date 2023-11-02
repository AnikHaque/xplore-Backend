"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const AuthGuard_1 = require("../../../enums/AuthGuard");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.ADMIN), blog_controller_1.BlogController.createBlog);
router.get("/", blog_controller_1.BlogController.getAllBlog);
router.get("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.ADMIN), blog_controller_1.BlogController.getSingleBlog);
router.patch("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.ADMIN), blog_controller_1.BlogController.updateBlog);
router.delete("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.ADMIN), blog_controller_1.BlogController.deleteBlog);
exports.BlogRoutes = router;
