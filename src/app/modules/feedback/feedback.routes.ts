import express from "express";
import auth from "../../middleware/auth";
import { EAuthGuardRoles } from "../../../enums/AuthGuard";
import { FeedbackController } from "./feedback.controller";

const router = express.Router();

router.post(
  "/",
  auth(EAuthGuardRoles.TOURIST),
  FeedbackController.createFeedback
);

router.get("/", FeedbackController.getFeedback);

export const FeedbackRoutes = router;
