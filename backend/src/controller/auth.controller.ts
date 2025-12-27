import { Request, Response } from "express";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/AsyncHandler";
import UserModel from "../models/user.model";
import PatientModel from "../models/patient.model";
import { userRegisterSchema } from "../zodSchema/user.schema";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { sendToken } from "../utils/SendToken";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const parsed = userRegisterSchema.parse(req.body);

    const existingUser = await UserModel.findOne({ email: parsed.email });
    if (existingUser)
      return res.status(400).json(new ApiError(400, "Email already exists"));

    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    const user = await UserModel.create({
      name: parsed.name,
      email: parsed.email,
      password: hashedPassword,
      role: parsed.role,
    });

    if (parsed.role === "patient") {
      await PatientModel.create({ userId: user._id });
    }

    sendToken({
      user: {
        id: user._id.toString(),
        fullName: user.name,
        email: user.email,
        role: user.role,
      },
      statusCode: 201,
      res,
      message: "User registered successfully",
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully"));
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");
  if (!user)
    return res.status(400).json(new ApiError(400, "Invalid credentials"));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json(new ApiError(400, "Invalid credentials"));

  sendToken({
    user: {
      id: user._id.toString(),
      fullName: user.name,
      email: user.email,
      role: user.role,
    },
    statusCode: 200,
    res,
    message: `Welcome back ${user.name}`,
  });
});

export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("token", { httpOnly: true });
  return res.status(200).json(new ApiResponse(200, "Logout successful"));
});

export const getProfile = asyncHandler(async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user.id;

    const user = await UserModel.findById(userId).select("-password");
    if (!user) return res.status(404).json(new ApiError(404, "User not found"));

    let patientProfile = null;
    if (user.role === "patient") {
      patientProfile = await PatientModel.findOne({ userId: user._id });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { user, patientProfile }, "Profile fetched"));
  }
);

export const updateProfile = asyncHandler( async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user.id;
    const updates = req.body;

    const user = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json(new ApiError(404, "User not found"));

    let patientProfile = null;
    if (user.role === "patient") {
      patientProfile = await PatientModel.findOneAndUpdate(
        { userId: user._id },
        updates,
        { new: true }
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { user, patientProfile }, "Profile updated"));
  }
);
