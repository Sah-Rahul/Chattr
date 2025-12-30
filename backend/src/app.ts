import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./services/db.service";
import { errorMiddleware } from "./middleware/error.middleware";

// Routes
import patientRouter from "./routes/patient.routes";
import doctorRouter from "./routes/doctor.routes";
import managementRouter from "./routes/management.routes";

const app: Application = express();

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

// API Routes
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/management", managementRouter);

// Error Middleware
app.use(errorMiddleware);

export default app;
