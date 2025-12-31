import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createSlot, deleteSlot, getDoctorById, getDoctorProfile, getMyAppointments, getMySlots, loginDoctor, updateAppointmentStatus } from "../controller/doctor.controller";
 
const doctorRouter = Router();

doctorRouter.post("/login", loginDoctor);

doctorRouter.get("/me", authMiddleware, getDoctorProfile);

doctorRouter.post("/slot", authMiddleware, createSlot);
doctorRouter.get("/slots", authMiddleware, getMySlots);
doctorRouter.delete("/slot/:id", authMiddleware, deleteSlot);
doctorRouter.get("/:id", getDoctorById);


doctorRouter.get("/appointments", authMiddleware, getMyAppointments);
doctorRouter.patch("/appointment/:id", authMiddleware, updateAppointmentStatus);

export default doctorRouter;
