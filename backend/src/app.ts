import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./services/db.service";
import { errorMiddleware } from "./middleware/error.middleware";

// Routes
const app: Application = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

 

/* ERROR */
app.use(errorMiddleware);

export default app;
