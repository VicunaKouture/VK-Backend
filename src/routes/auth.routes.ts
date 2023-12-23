import { Router, Request, Response } from "express";
import { authController } from "../controllers/auth.controller";
import { googleAuth } from "../config/passport";
import passport from "passport";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/google", googleAuth.authenticate);
router.get(
  "/google/callback",
  googleAuth.googleCallback,
  authController.googleCallback
);

export default router;
