import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getPatientProfile,
  updatePatientProfile,
  getMyAppointments,
  bookAppointment,
  cancelAppointment,
  getPrescriptions,
  getMedicalReports,
} from "../controller/patient.controller";

const patientRouter = express.Router();

patientRouter.get("/profile", authMiddleware, getPatientProfile);
patientRouter.put("/update/profile", authMiddleware, updatePatientProfile);

patientRouter.get("/appointments", authMiddleware, getMyAppointments);
patientRouter.post("/bookappointment", authMiddleware, bookAppointment);
patientRouter.delete(
  "/appointments/cancel/:appointmentId",
  authMiddleware,
  cancelAppointment
);

patientRouter.get("/prescriptions", authMiddleware, getPrescriptions);

patientRouter.get("/medical-reports", authMiddleware, getMedicalReports);

export default patientRouter;



