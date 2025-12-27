import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { setAvailabilitySlots } from "../controller/doctor.controller";

const doctorRouter = Router()

doctorRouter.post("/create-slots", authMiddleware, setAvailabilitySlots);

export default doctorRouter