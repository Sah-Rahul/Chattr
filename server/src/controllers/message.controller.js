import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Message.js";

export const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const convo = await Conversation.findById(conversationId);
  if (!convo || !convo.members.includes(req.user._id)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const messages = await Message.find({ conversation: conversationId })
    .populate("sender", "name email avatar")
    .sort("createdAt");
  res.json(messages);
};

export const sendMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { content } = req.body;
  const convo = await Conversation.findById(conversationId);
  if (!convo || !convo.members.includes(req.user._id)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const message = await Message.create({
    conversation: conversationId,
    sender: req.user._id,
    content,
  });
  await Conversation.findByIdAndUpdate(conversationId, {
    latestMessage: message._id,
  });
  const populated = await message.populate("sender", "name email avatar");
  req.app.get("io")?.to(conversationId).emit("message:new", populated);
  res.status(201).json(populated);
};
