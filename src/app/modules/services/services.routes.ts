import express from "express";
import { ServicesController } from "./services.controller";
import auth from "../../middleware/auth";
import { EAuthGuardRoles } from "../../../enums/AuthGuard";

const router = express.Router();

router.post(
  "/",
  auth(EAuthGuardRoles.ADMIN, EAuthGuardRoles.SUPER_ADMIN),
  ServicesController.createService
);

router.get("/", ServicesController.getServices);

router.get("/:id", ServicesController.getSingleService);

router.patch(
  "/:id",
  auth(EAuthGuardRoles.ADMIN, EAuthGuardRoles.SUPER_ADMIN),
  ServicesController.updateService
);

router.delete(
  "/:id",
  auth(EAuthGuardRoles.ADMIN, EAuthGuardRoles.SUPER_ADMIN),
  ServicesController.deleteService
);

export const ServicesRoutes = router;
