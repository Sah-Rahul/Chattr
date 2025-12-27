import { Router } from "express";
import { addDoctor, getAllDoctors } from "../controller/management.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const managementRouter = Router()

managementRouter.post("/addDoctor",authMiddleware, addDoctor)
managementRouter.get("/alldoctor",authMiddleware, getAllDoctors)


export default managementRouter