"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const services_controller_1 = require("./services.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const AuthGuard_1 = require("../../../enums/AuthGuard");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN), services_controller_1.ServicesController.createService);
router.get("/", services_controller_1.ServicesController.getServices);
router.get("/:id", services_controller_1.ServicesController.getSingleService);
router.patch("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN), services_controller_1.ServicesController.updateService);
router.delete("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.ADMIN, AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN), services_controller_1.ServicesController.deleteService);
exports.ServicesRoutes = router;
