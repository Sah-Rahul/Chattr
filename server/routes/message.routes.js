import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", authMiddleware, sendMessage);
messageRouter.get("/get-messages/:otherParticipantId", authMiddleware, getMessages);
 
export default messageRouter;
