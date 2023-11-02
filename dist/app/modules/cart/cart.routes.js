"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const AuthGuard_1 = require("../../../enums/AuthGuard");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.TOURIST), cart_controller_1.CartController.addToCart);
router.get("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.TOURIST), cart_controller_1.CartController.getAllCart);
router.delete("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.TOURIST), cart_controller_1.CartController.removeCart);
exports.CartRoutes = router;
