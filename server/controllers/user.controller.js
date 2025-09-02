import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import asyncHandler from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/errorHandler.utility.js";
import {
  sendAuthResponse,
  clearAuthCookie,
} from "../utilities/sendToken.utility.js";

//todo ===== REGISTER USER =====
export const registerUser = asyncHandler(async (req, res, next) => {
  let { fullName, password, email, gender } = req.body;

  if (!fullName || !password || !email || !gender) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  email = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  //todo avatar suggestion via DiceBear (reliable free placeholder)
  const avatarType = gender === "male" ? "adventurer" : "adventurer";
  const avatarUrl = `https://api.dicebear.com/7.x/${avatarType}/svg?seed=${encodeURIComponent(
    fullName
  )}`;

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    gender,
    avatar: avatarUrl,
  });

  return sendAuthResponse(res, newUser, 201, "User registered successfully");
});

//todo ===== LOGIN USER =====
export const loginUser = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  email = email.trim().toLowerCase();

  //todo if password is select:false in schema, force include it
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  //todo Optional: Avoid returning password
  user.password = undefined;

  return sendAuthResponse(res, user, 200, "Login successful");
});

//todo ===== LOGOUT USER =====
export const logoutUser = asyncHandler(async (req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//todo ===== GET ME =====
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  return res.status(200).json({ success: true, user });
});

//todo ===== GETOTHERUSERS =====
export const getOtherUsers = asyncHandler(async (req, res) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } });

  return res.status(200).json({
    success: true,
    users: otherUsers,
  });
});
