import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  addDoctor,
  getAllDoctors,
  updateDoctorStatus,
  deleteDoctor,
  addStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  getDashboardStats,
} from "../controller/management.controller";
import { upload } from "../services/multer.service";

const managementRouter = express.Router();

managementRouter.post(
  "/doctors",
  authMiddleware,
  upload.single("doctor"),
  addDoctor
);
managementRouter.get("/doctors", authMiddleware, getAllDoctors);
managementRouter.patch(
  "/doctors/:doctorId/status",
  authMiddleware,
  updateDoctorStatus
);
managementRouter.delete("/doctors/:doctorId", authMiddleware, deleteDoctor);

managementRouter.post(
  "/staff",
  authMiddleware,
  upload.single("staff"),
  addStaff
);
managementRouter.get("/staff", authMiddleware, getAllStaff);
managementRouter.patch("/staff/:staffId", authMiddleware, updateStaff);
managementRouter.delete("/staff/:staffId", authMiddleware, deleteStaff);

managementRouter.get("/dashboard", authMiddleware, getDashboardStats);

export default managementRouter;
