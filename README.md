# MERN Chat App (Vite + React + Tailwind + Express + MongoDB + Socket.IO)

A clean, modern real‑time chat built with the MERN stack.

## Features
- JWT auth (register/login)
- Search users, start 1‑to‑1 chats
- Real‑time messaging, typing indicator, online status (Socket.IO)
- Modern dark UI with Tailwind
- MVC on server (models/controllers/routes) + sockets

## Folder Structure
```
mern-chat-app/
  server/
    src/
      controllers/
      lib/
      middleware/
      models/
      routes/
      socket.js
      index.js
    package.json
    .env.example
  client/
    src/
      lib/
      pages/
      store/
      App.jsx, main.jsx, index.css
    package.json
    .env.example
  README.md
```

## Quick Start

### 1) Server
```bash
cd server
cp .env.example .env
# edit .env -> MONGO_URI, JWT_SECRET
npm install
npm run dev
```
Server runs at `http://localhost:5000`.

### 2) Client
```bash
cd ../client
cp .env.example .env
# edit .env -> VITE_API_URL=http://localhost:5000
npm install
npm run dev
```
App runs at `http://localhost:5173`.

Login/Register first, then search a user by name/email, start a DM, and chat in real‑time.

## Notes
- Make sure MongoDB is running locally (`mongodb://127.0.0.1:27017/mern_chat_app`) or update the URI.
- Socket connects using the JWT token from login/register.
