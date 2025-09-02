import express from "express";
import { getMe, getOtherUsers, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getMe);
router.get("/get-otherUsers", authMiddleware, getOtherUsers);

export default router;
