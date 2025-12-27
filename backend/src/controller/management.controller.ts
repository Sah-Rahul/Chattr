import { AuthRequest } from "../middleware/auth.middleware";
import DoctorModel from "../models/doctor.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";

export const addDoctor = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can add doctors");

  const { specialization, qualification, description, experience, age } =
    req.body;

  const existingProfile = await DoctorModel.findOne({ userId: user._id });
  if (existingProfile) {
    throw new ApiError(400, "Doctor profile already exists");
  }

  const doctor = await DoctorModel.create({
    userId: user._id,
    specialization,
    qualification,
    experience,
    description,
    age,
  });

  res.status(201).json(new ApiResponse(201, doctor, "Doctor profile created"));
});

export const getAllDoctors = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can view doctors");

  const doctors = await DoctorModel.find()
    .populate("userId", "name email")  
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, doctors, "Doctors fetched successfully"));
});
