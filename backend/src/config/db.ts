import mongoose from "mongoose";
import { getEnv } from "../utils/get-env";

export const connectDB = async () => {
  try {
    await mongoose.connect(getEnv("MONGO_URI"));
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
