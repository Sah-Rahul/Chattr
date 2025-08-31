import jwt from "jsonwebtoken";
import asyncHandler from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/errorHandler.utility.js";
import User from "../models/user.model.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;
   
  if (!token) return next(new ErrorHandler("Not authenticated", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("_id fullName email");
    if (!req.user) return next(new ErrorHandler("User not found", 401));
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});
