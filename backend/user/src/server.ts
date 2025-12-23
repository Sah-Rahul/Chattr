import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();

connectDB()
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
