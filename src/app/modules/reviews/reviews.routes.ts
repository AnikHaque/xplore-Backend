import express from "express";
import { ReviewsController } from "./reviews.controller";
import auth from "../../middleware/auth";
import { EAuthGuardRoles } from "../../../enums/AuthGuard";

const router = express.Router();

router.post(
  "/",
  auth(
    EAuthGuardRoles.ADMIN,
    EAuthGuardRoles.SUPER_ADMIN,
    EAuthGuardRoles.TOURIST
  ),
  ReviewsController.createReviews
);

router.get(
  "/:id",
  auth(
    EAuthGuardRoles.ADMIN,
    EAuthGuardRoles.SUPER_ADMIN,
    EAuthGuardRoles.TOURIST
  ),
  ReviewsController.getAllReview
);

export const ReviewsRoutes = router;
