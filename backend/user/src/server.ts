import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import { createClient } from "redis";
dotenv.config();

const app = express();

connectDB()
export const redisClient = createClient({
  url:process.env.REDIS_URL
})

redisClient
.connect()
.then(()=> console.log("connected to the redis"))
.catch((error
)=> console.log("connection failed to the redis",error.message))


const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
