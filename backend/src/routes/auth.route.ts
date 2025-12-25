import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.Config";
import { googleLoginCallback } from "../controllers/auth.controller";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = Router();

// authRoutes.post("/register", registerUserController);
// authRoutes.post("/login", loginController);

// authRoutes.post("/logout", logOutController);

authRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_ORIGIN || "http://localhost:5173");
  }
);

export default authRoutes;
