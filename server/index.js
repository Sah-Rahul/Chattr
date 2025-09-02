import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// impprt routes
import { errorMiddleware } from "./middleware/error.middleware.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js"

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

app.get("/", (req, res) => {
  res.send("server is running ✅ ...");
});

app.use(errorMiddleware);
app.listen(PORT, () => {
  ConnectDB();
  console.log(`server is running on http://localhost:${PORT}`);
});
