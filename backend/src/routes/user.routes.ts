import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getProfile, loginUser, logoutUser, registerUser, updateProfile } from "../controller/auth.controller";
 

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);
authRouter.get("/profile", authMiddleware, getProfile);
authRouter.patch("/profile/update", authMiddleware, updateProfile);

export default authRouter;
