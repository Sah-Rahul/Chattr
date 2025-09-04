import jwt from 'jsonwebtoken';
import { Conversation } from './models/Conversation.js';

const onlineUsers = new Map();  

export const authSocketMiddleware = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('No token'));
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.userId;
    next();
  } catch (e) {
    next(new Error('Unauthorized'));
  }
};

export const registerSocketHandlers = (io, socket) => {
  // store online
  onlineUsers.set(socket.userId, socket.id);
  io.emit('online:users', Array.from(onlineUsers.keys()));

  // join all user's conversation rooms
  Conversation.find({ members: socket.userId }, '_id').then(convos => {
    convos.forEach(c => socket.join(String(c._id)));
  });

  socket.on('message:typing', ({ conversationId, isTyping }) => {
    socket.to(conversationId).emit('message:typing', { userId: socket.userId, isTyping });
  });

  socket.on('disconnect', () => {
    onlineUsers.delete(socket.userId);
    io.emit('online:users', Array.from(onlineUsers.keys()));
  });
};
