import bcrypt from "bcrypt";
import User from "../models/user.model";
import Doctor from "../models/doctor.model";
import Appointment from "../models/appointment.model";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { sendToken } from "../utils/SendToken";

 
export const loginManagement = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, role: "management" }).select(
    "+password"
  );
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new ApiError(401, "Invalid credentials");

  sendToken({
    user: { id: user._id.toString(), name: user.name, role: user.role },
    res,
    statusCode: 200,
  });
});

 
export const createDoctor = asyncHandler(async (req, res) => {
  const { name, email, password, specialization, experience } = req.body;

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: "doctor",
  });

  const doctor = await Doctor.create({
    userId: user._id,
    specialization,
    experience,
    status: "pending",
  });

  res.status(201).json(new ApiResponse(201, doctor));
});

export const approveDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(new ApiResponse(200, doctor));
});

export const blockDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    { status: "blocked" },
    { new: true }
  );
  res.json(new ApiResponse(200, doctor));
});

 
export const getAllDoctors = asyncHandler(async (_req, res) => {
  const doctors = await Doctor.find().populate("userId", "name email");
  res.json(new ApiResponse(200, doctors));
});

export const getAllAppointments = asyncHandler(async (_req, res) => {
  const list = await Appointment.find().populate("patientId doctorId slotId");
  res.json(new ApiResponse(200, list));
});
