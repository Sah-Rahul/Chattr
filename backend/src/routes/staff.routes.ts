import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getTasks,
  updateTaskStatus,
  getPatientDetailsForTask,
  updateStaffProfile,
  getStaffProfile,
} from "../controller/staff.controller";

const staffRouter = express.Router();

// Profile
staffRouter.get("/profile", authMiddleware, getStaffProfile);
staffRouter.put("/profile", authMiddleware, updateStaffProfile);

// Tasks
staffRouter.get("/tasks", authMiddleware, getTasks);
staffRouter.patch("/tasks/:taskId/status", authMiddleware, updateTaskStatus);
staffRouter.get(
  "/tasks/:taskId/patient",
  authMiddleware,
  getPatientDetailsForTask
);

export default staffRouter;
