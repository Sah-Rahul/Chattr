import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import convoRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { authSocketMiddleware, registerSocketHandlers } from "./socket.js";

const app = express();
const server = http.createServer(app);

const CLIENT_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const io = new Server(server, {
  cors: { origin: CLIENT_ORIGIN, credentials: true },
});
app.set("io", io);

io.use(authSocketMiddleware);
io.on("connection", (socket) => {
  registerSocketHandlers(io, socket);
});

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => res.json({ ok: true, message: "MERN Chat API" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", convoRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  await connectDB();
  console.log("🚀 Server listening on", PORT);
});
