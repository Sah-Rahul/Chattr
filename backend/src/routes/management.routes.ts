import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { approveDoctor, blockDoctor, createDoctor, getAllAppointments, getAllDoctors, loginManagement } from "../controller/management.controller";

const managementRouter = express.Router();

 managementRouter.post("/login", loginManagement);

managementRouter.post("/doctor", authMiddleware, createDoctor);
managementRouter.patch("/doctor/:id/approve", authMiddleware, approveDoctor);
managementRouter.patch("/doctor/:id/block", authMiddleware, blockDoctor);

managementRouter.get("/doctors", authMiddleware, getAllDoctors);
managementRouter.get("/appointments", authMiddleware, getAllAppointments);

export default managementRouter;
