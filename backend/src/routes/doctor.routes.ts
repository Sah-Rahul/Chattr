import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  acceptAppointment,
  addPrescription,
  getPatientHistory,
  getTodayAppointments,
  rejectAppointment,
  setAvailabilitySlots,
} from "../controller/doctor.controller";

const doctorRouter = Router();

doctorRouter.post("/create-slots", authMiddleware, setAvailabilitySlots);

doctorRouter.get("/appointments", authMiddleware, getTodayAppointments);

doctorRouter.patch(
  "/appointments/:appointmentId/accept",
  authMiddleware,
  acceptAppointment
);

doctorRouter.patch(
  "/appointments/:appointmentId/reject",
  authMiddleware,
  rejectAppointment
);

doctorRouter.get("/:patientId/history",
  authMiddleware,
  getPatientHistory
);

doctorRouter.post(
  "/appointments/:appointmentId/prescription",
  authMiddleware,
  addPrescription
);
export default doctorRouter;
