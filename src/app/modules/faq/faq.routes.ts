import express from "express";
import auth from "../../middleware/auth";
import { EAuthGuardRoles } from "../../../enums/AuthGuard";
import { FAQController } from "./faq.controller";

const router = express.Router();

router.post(
  "/",
  auth(EAuthGuardRoles.SUPER_ADMIN, EAuthGuardRoles.ADMIN),
  FAQController.createFAQ
);

router.get("/", FAQController.getAllFAQ);

router.get(
  "/:id",
  auth(EAuthGuardRoles.SUPER_ADMIN, EAuthGuardRoles.ADMIN),
  FAQController.getSingleFAQ
);

router.patch(
  "/:id",
  auth(EAuthGuardRoles.SUPER_ADMIN, EAuthGuardRoles.ADMIN),
  FAQController.updateFAQ
);

router.delete(
  "/:id",
  auth(EAuthGuardRoles.SUPER_ADMIN, EAuthGuardRoles.ADMIN),
  FAQController.deleteFAQ
);

export const FAQRoutes = router;
