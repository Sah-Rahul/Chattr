import bcrypt from "bcrypt";
import User from "../models/user.model";
import Doctor from "../models/doctor.model";
import Slot from "../models/slot.model";
import Appointment from "../models/appointment.model";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { sendToken } from "../utils/SendToken";
import { AuthRequest } from "../middleware/auth.middleware";

 
export const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, role: "doctor" }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new ApiError(401, "Invalid credentials");

  sendToken({
    user: { id: user._id.toString(), name: user.name, role: user.role },
    res,
    statusCode: 200,
  });
});

 
export const getDoctorProfile = asyncHandler<AuthRequest>(async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.user!._id }).populate(
    "userId",
    "name email"
  );
  res.json(new ApiResponse(200, doctor));
});

 
export const createSlot = asyncHandler<AuthRequest>(async (req, res) => {
  const slot = await Slot.create({
    doctorId: req.user!._id,
    ...req.body,
  });
  res.status(201).json(new ApiResponse(201, slot));
});

export const deleteSlot = asyncHandler<AuthRequest>(async (req, res) => {
  await Slot.deleteOne({ _id: req.params.id, doctorId: req.user!._id });
  res.json(new ApiResponse(200, null, "Slot deleted"));
});

export const getMySlots = asyncHandler<AuthRequest>(async (req, res) => {
  const slots = await Slot.find({ doctorId: req.user!._id });
  res.json(new ApiResponse(200, slots));
});

 
export const getMyAppointments = asyncHandler<AuthRequest>(async (req, res) => {
  const list = await Appointment.find({ doctorId: req.user!._id }).populate(
    "patientId slotId"
  );
  res.json(new ApiResponse(200, list));
});

export const updateAppointmentStatus = asyncHandler<AuthRequest>(
  async (req, res) => {
    const { status } = req.body;

    const appointment = await Appointment.findOne({
      _id: req.params.id,
      doctorId: req.user!._id,
    });
    if (!appointment) throw new ApiError(404, "Appointment not found");

    appointment.status = status;
    await appointment.save();

    res.json(new ApiResponse(200, appointment, "Status updated"));
  }
);
