import bcrypt from "bcrypt";
import User from "../models/user.model";
import Appointment from "../models/appointment.model";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { sendToken } from "../utils/SendToken";
import DoctorModel from "../models/doctor.model";
import { uploadToCloudinary } from "../services/cloudinary.service";
import PatientModel from "../models/patient.model";

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
  const {
    name,
    email,
    specialization,
    experience,
    qualification,
    age,
    description,
  } = req.body;

  if (await User.findOne({ email }))
    throw new ApiError(400, "Doctor already exists");

  let image: string | undefined;

  if (req.file) {
    const uploaded = await uploadToCloudinary(req.file.buffer, "doctors");
    image = uploaded.secure_url;
  }

  const defaultPassword = "Doctor@123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,  
    role: "doctor",
  });

  const doctor = await DoctorModel.create({
    userId: user._id,
    specialization,
    experience,
    qualification,
    age,
    description,
    image,
    status: "approved",
  });

  res
    .status(201)
    .json(new ApiResponse(201, doctor, "Doctor created successfully"));
});

export const approveDoctor = asyncHandler(async (req, res) => {
  const doctor = await DoctorModel.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(new ApiResponse(200, doctor));
});

export const blockDoctor = asyncHandler(async (req, res) => {
  const doctor = await DoctorModel.findByIdAndDelete(
    req.params.id,
    { new: true }
  );
  res.json(new ApiResponse(200, doctor));
});

export const getAllDoctors = asyncHandler(async (_req, res) => {
  const doctors = await DoctorModel.find().populate("userId", "name email");
  res.json(new ApiResponse(200, doctors));
});

export const getAllPatients = asyncHandler(async (_req, res) => {
  const doctors = await PatientModel.find().populate("userId", "name email");
  res.json(new ApiResponse(200, doctors));
});

export const getAllAppointments = asyncHandler(async (_req, res) => {
  const list = await Appointment.find();
  res.json(new ApiResponse(200, list));
});
