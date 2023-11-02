"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const AuthGuard_1 = require("../../../enums/AuthGuard");
const faq_controller_1 = require("./faq.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.ADMIN), faq_controller_1.FAQController.createFAQ);
router.get("/", faq_controller_1.FAQController.getAllFAQ);
router.get("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.ADMIN), faq_controller_1.FAQController.getSingleFAQ);
router.patch("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.ADMIN), faq_controller_1.FAQController.updateFAQ);
router.delete("/:id", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.SUPER_ADMIN, AuthGuard_1.EAuthGuardRoles.ADMIN), faq_controller_1.FAQController.deleteFAQ);
exports.FAQRoutes = router;
