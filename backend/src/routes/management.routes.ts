import { Router } from "express";
import { addDoctor } from "../controller/management.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const managementRouter = Router()

managementRouter.post("/addDoctor",authMiddleware, addDoctor)

export default managementRouter