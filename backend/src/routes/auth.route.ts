import { Router } from "express";
import {
  googleLoginCallback,
  loginController,
  logoutController,
  registerUserController,
} from "../controllers/auth.controller";
import { config } from "../config/app.config";
import passport from "passport";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;
const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);
authRoutes.post("/logout", logoutController);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "emails"],
  })
);
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
  }),
  googleLoginCallback
);

export default authRoutes;
