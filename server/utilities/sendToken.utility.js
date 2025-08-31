import jwt from "jsonwebtoken";

export function createJWT(userId, expiresIn = "7d") {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
}

export function setAuthCookie(res, token, maxAgeMs = 7 * 24 * 60 * 60 * 1000) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
    path: "/",
    maxAge: maxAgeMs,
  });
}

 
export function sendAuthResponse(res, user, statusCode = 200, message = "OK") {
  const token = createJWT(user._id.toString(), "7d");
  setAuthCookie(res, token);
  return res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
      avatar: user.avatar,
    },
  });
}

 
export function clearAuthCookie(res) {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
    path: "/",
  });
}
