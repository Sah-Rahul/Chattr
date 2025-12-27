import { Types } from "mongoose";
import { AuthRequest } from "../middleware/auth.middleware";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandler";
import DoctorModel from "../models/doctor.model";
import AvailabilitySlotModel from "../models/availability.model";
import { ApiResponse } from "../utils/ApiResponse";

export const getTodayAppointments = asyncHandler(async (req, res) => {});

export const acceptAppointment = asyncHandler(async (req, res) => {});

export const rejectAppointment = asyncHandler(async (req, res) => {});

export const getPatientHistory = asyncHandler(async (req, res) => {});

export const addPrescription = asyncHandler(async (req, res) => {});

export const setAvailabilitySlots = asyncHandler<AuthRequest>(
  async (req, res) => {
    const user = req.user;
    if (!user) throw new ApiError(401, "Unauthorized");

    const { doctorId, date, slots } = req.body;

    if (!Types.ObjectId.isValid(doctorId)) {
      throw new ApiError(400, "Invalid doctor ID");
    }

    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) throw new ApiError(404, "Doctor not found");
    // if (doctor.status !== "approved") {
    //   throw new ApiError(400, "Doctor not approved");
    // }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ApiError(400, "Invalid date format. Use YYYY-MM-DD");
    }

    // Create multiple slots
    const availabilitySlots = slots.map((slot: any) => ({
      doctorId,
      date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: false,
      isActive: true,
    }));

    const createdSlots = await AvailabilitySlotModel.insertMany(
      availabilitySlots
    );

    res
      .status(201)
      .json(new ApiResponse(201, createdSlots, "Slots created successfully"));
  }
);

export const chatWithPatient = asyncHandler(async (req, res) => {});

export const chatWithManagement = asyncHandler(async (req, res) => {});
