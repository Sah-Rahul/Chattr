import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  approveDoctor,
  blockDoctor,
  createDoctor,
  getAllAppointments,
  getAllDoctors,
  getAllPatients,
  loginManagement,
} from "../controller/management.controller";
import { upload } from "../services/multer.service";

const managementRouter = express.Router();

managementRouter.post("/login", loginManagement);

managementRouter.post(
  "/doctor",
  authMiddleware,
  upload.single("image"),
  createDoctor
);
managementRouter.patch("/doctor/:id/approve", authMiddleware, approveDoctor);
managementRouter.patch("/doctor/:id/block", authMiddleware, blockDoctor);

managementRouter.get("/doctors", authMiddleware, getAllDoctors);
managementRouter.get("/patients", authMiddleware, getAllPatients);
managementRouter.get("/appointments", authMiddleware, getAllAppointments);

export default managementRouter;
