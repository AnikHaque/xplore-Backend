"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const AuthGuard_1 = require("../../../enums/AuthGuard");
const feedback_controller_1 = require("./feedback.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(AuthGuard_1.EAuthGuardRoles.TOURIST), feedback_controller_1.FeedbackController.createFeedback);
router.get("/", feedback_controller_1.FeedbackController.getFeedback);
exports.FeedbackRoutes = router;
