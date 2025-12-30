import bcrypt from "bcrypt";
import User from "../models/user.model";
import Patient from "../models/patient.model";
import Doctor from "../models/doctor.model";
import Slot from "../models/slot.model";
import Appointment from "../models/appointment.model";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { sendToken } from "../utils/SendToken";
import { AuthRequest } from "../middleware/auth.middleware";

 
export const registerPatient = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ email }))
    throw new ApiError(400, "Email already exists");

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: "patient",
  });

  await Patient.create({ userId: user._id });

  sendToken({
    user: { id: user._id.toString(), name: user.name, role: user.role },
    res,
    statusCode: 201,
    message: "Patient registered",
  });
});

export const loginPatient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, role: "patient" }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new ApiError(401, "Invalid credentials");

  sendToken({
    user: { id: user._id.toString(), name: user.name, role: user.role },
    res,
    statusCode: 200,
  });
});

export const logoutPatient = asyncHandler(async (_req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.json(new ApiResponse(200, null, "Logged out"));
});

 
export const getPatientProfile = asyncHandler<AuthRequest>(async (req, res) => {
  const patient = await Patient.findOne({ userId: req.user!._id }).populate(
    "userId",
    "name email"
  );
  res.json(new ApiResponse(200, patient));
});

export const updatePatientProfile = asyncHandler<AuthRequest>(async (req, res) => {
  if (req.body.name) req.user!.name = req.body.name;
  await req.user!.save();
  res.json(new ApiResponse(200, req.user, "Profile updated"));
});

 
export const getApprovedDoctors = asyncHandler(async (_req, res) => {
  const doctors = await Doctor.find({ status: "approved" }).populate(
    "userId",
    "name email"
  );
  res.json(new ApiResponse(200, doctors));
});

export const getDoctorSlots = asyncHandler(async (req, res) => {
  const slots = await Slot.find({
    doctorId: req.params.doctorId,
    isBooked: false,
  });
  res.json(new ApiResponse(200, slots));
});

 
export const bookAppointment = asyncHandler<AuthRequest>(async (req, res) => {
  const { doctorId, slotId } = req.body;

  const slot = await Slot.findById(slotId);
  if (!slot || slot.isBooked) throw new ApiError(400, "Slot not available");

  const appointment = await Appointment.create({
    patientId: req.user!._id,
    doctorId,
    slotId,
    status: "pending",
  });

  slot.isBooked = true;
  await slot.save();

  res.status(201).json(new ApiResponse(201, appointment, "Appointment booked"));
});

export const cancelAppointment = asyncHandler<AuthRequest>(async (req, res) => {
  const appointment = await Appointment.findOne({
    _id: req.params.id,
    patientId: req.user!._id,
  });
  if (!appointment) throw new ApiError(404, "Not found");

  appointment.status = "cancelled";
  await appointment.save();

  res.json(new ApiResponse(200, appointment, "Cancelled"));
});

export const getMyAppointments = asyncHandler<AuthRequest>(async (req, res) => {
  const list = await Appointment.find({ patientId: req.user!._id }).populate(
    "doctorId slotId"
  );
  res.json(new ApiResponse(200, list));
});
