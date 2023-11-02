import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { EAuthGuardRoles } from "../../../enums/AuthGuard";

const router = express.Router();

router.get(
  "/profile",
  auth(
    EAuthGuardRoles.ADMIN,
    EAuthGuardRoles.SUPER_ADMIN,
    EAuthGuardRoles.TOURIST
  ),
  UserController.getUserProfile
);

router.get(
  "/",
  auth(EAuthGuardRoles.ADMIN, EAuthGuardRoles.SUPER_ADMIN),
  UserController.getAllUser
);

router.get(
  "/:id",
  auth(
    EAuthGuardRoles.ADMIN,
    EAuthGuardRoles.SUPER_ADMIN,
    EAuthGuardRoles.TOURIST
  ),
  UserController.getSingleUserById
);

router.patch(
  "/update-single/:id",
  auth(
    EAuthGuardRoles.ADMIN,
    EAuthGuardRoles.SUPER_ADMIN,
    EAuthGuardRoles.TOURIST
  ),
  UserController.updateSingleUserById
);

router.patch(
  "/",
  auth(
    EAuthGuardRoles.ADMIN,
    EAuthGuardRoles.SUPER_ADMIN,
    EAuthGuardRoles.TOURIST
  ),
  UserController.updateUser
);

router.patch(
  "/update-role/:id",
  auth(EAuthGuardRoles.ADMIN, EAuthGuardRoles.SUPER_ADMIN),
  UserController.updateRole
);

router.delete(
  "/:id",
  auth(EAuthGuardRoles.ADMIN, EAuthGuardRoles.SUPER_ADMIN),
  UserController.deleteUser
);

export const UserRoutes = router;
