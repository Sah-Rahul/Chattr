import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  bookAppointment,
  cancelAppointment,
  getApprovedDoctors,
  getDoctorSlots,
  getMyAppointments,
  getPatientProfile,
  loginPatient,
  logoutPatient,
  registerPatient,
  updatePatientProfile,
} from "../controller/patient.controller";

const patientRouter = express.Router();

patientRouter.post("/register", registerPatient);
patientRouter.post("/login", loginPatient);
patientRouter.post("/logout", logoutPatient);

patientRouter.get("/me", authMiddleware, getPatientProfile);
patientRouter.put("/me", authMiddleware, updatePatientProfile);

patientRouter.get("/doctors", getApprovedDoctors);
patientRouter.get("/slots/:doctorId", getDoctorSlots);

patientRouter.post("/appointment", authMiddleware, bookAppointment);
patientRouter.get("/appointments", authMiddleware, getMyAppointments);
patientRouter.patch(
  "/appointment/:id/cancel",
  authMiddleware,
  cancelAppointment
);

export default patientRouter;
