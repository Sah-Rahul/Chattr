import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.Config";
import { connectDB } from "./config/db.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import asyncHandler from "./middlewares/asyncHandler.middleware";
import passport from "passport";
import "./config/password.config";
import authRoutes from "./routes/auth.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Session
app.use(
  session({
    name: "Session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(`${BASE_PATH}`, authRoutes);

// Health Check
app.post(
  "/",
  asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running 🚀",
      env: config.NODE_ENV,
    });
  })
);

// Error handler
app.use(errorHandler);

// Start Server
const PORT = Number(config.PORT);
app.listen(PORT, () => {
  console.log(
    `✅ Server running on http://localhost:${PORT} (${config.NODE_ENV})`
  );
});
