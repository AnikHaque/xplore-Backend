"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const AuthGuard_1 = require("../../../enums/AuthGuard");
const router = express_1.default.Router();
router.get("/profile", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.TOURIST), user_controller_1.UserController.getUserProfile);
router.get("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN), user_controller_1.UserController.getAllUser);
router.get("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.TOURIST), user_controller_1.UserController.getSingleUserById);
router.patch("/update-single/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.TOURIST), user_controller_1.UserController.updateSingleUserById);
router.patch("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.TOURIST), user_controller_1.UserController.updateUser);
router.patch("/update-role/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN), user_controller_1.UserController.updateRole);
router.delete("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
