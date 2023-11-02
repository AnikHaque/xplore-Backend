import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/sign-up", AuthController.signUp);

router.post("/sign-in", AuthController.login);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
