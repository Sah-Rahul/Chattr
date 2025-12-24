import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  // App
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "3000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),

  // Database
  MONGO_URI: getEnv("MONGO_URI"),

  // Session
  SESSION_SECRET: getEnv("SESSION_SECRET"),
  SESSION_EXPIRES_IN: getEnv("SESSION_EXPIRES_IN", "7d"),

  // Google OAuth
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  GOOGLE_CALLBACK_URL: getEnv(
    "GOOGLE_CALLBACK_URL",
    "http://localhost:3000/api/v1/auth/google/callback"
  ),

  // Frontend
  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
  FRONTEND_GOOGLE_CALLBACK_URL: getEnv(
    "FRONTEND_GOOGLE_CALLBACK_URL",
    "http://localhost:5173/google/oauth"
  ),
});

export const config = appConfig();
