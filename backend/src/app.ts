import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./services/db.service";
import { errorMiddleware } from "./middleware/error.middleware";

// Routes
import authRouter from "./routes/user.routes";

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
app.use("/api/v1/auth", authRouter);

// Error Middleware  
app.use(errorMiddleware);

export default app;
