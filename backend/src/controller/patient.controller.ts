import { AuthRequest } from "../middleware/auth.middleware";
import AppointmentModel from "../models/appointment.model";
import AvailabilitySlotModel from "../models/availability.model";
import DoctorModel from "../models/doctor.model";
import MedicalReportModel from "../models/medicalReport.model";
import PatientModel from "../models/patient.model";
import PrescriptionModel from "../models/prescription.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";
import { patientSchema } from "../zodSchema/patient.schema";

export const getPatientProfile = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;

  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "patient") throw new ApiError(403, "Access denied");

  const patient = await PatientModel.findOne({ userId: user._id });

  if (!patient) throw new ApiError(404, "Patient profile not found");

  res.status(200).json(new ApiResponse(200, patient));
});

export const updatePatientProfile = asyncHandler<AuthRequest>(
  async (req, res) => {
    const user = req.user;
    if (!user) throw new ApiError(401, "Unauthorized");

    const validatedData = patientSchema.parse(req.body);

    const patient = await PatientModel.findOneAndUpdate(
      { userId: user._id },
      { $set: validatedData },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json(new ApiResponse(200, patient, "Profile updated successfully"));
  }
);

export const getMyAppointments = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const patient = await PatientModel.findOne({ userId: user._id });
  if (!patient) throw new ApiError(404, "Patient not found");

  const appointments = await AppointmentModel.find({
    patientId: patient._id,
  }).sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, appointments));
});

export const bookAppointment = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const { doctorId, slotId } = req.body;

  const patient = await PatientModel.findOne({ userId: user._id });
  console.log("patient==============>",patient)
  if (!patient) throw new ApiError(404, "Patient not found");

  const doctor = await DoctorModel.findById(doctorId);
//   if (!doctor || doctor.status !== "approved") {
//     throw new ApiError(400, "Doctor not available");
//   }

  const slot = await AvailabilitySlotModel.findOne({
    _id: slotId,
    doctorId,
    isBooked: false,
  });

  if (!slot) throw new ApiError(400, "Slot not available");

  const appointment = await AppointmentModel.create({
    patientId: patient._id,
    doctorId,
    slotId,
    status: "pending",
    createdBy: "patient",
  });

  slot.isBooked = true;
  await slot.save();

  // notification logic here in (future)

  res.status(201).json(new ApiResponse(201, appointment, "Appointment booked"));
});

export const cancelAppointment = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const { appointmentId } = req.params;

  const patient = await PatientModel.findOne({ userId: user._id });
  if (!patient) throw new ApiError(404, "Patient not found");

  const appointment = await AppointmentModel.findOne({
    _id: appointmentId,
    patientId: patient._id,
  });

  if (!appointment) throw new ApiError(404, "Appointment not found");

  if (appointment.status !== "pending") {
    throw new ApiError(400, "Only pending appointments can be cancelled");
  }

  appointment.status = "cancelled";
  await appointment.save();

  await AvailabilitySlotModel.findByIdAndUpdate(appointment.slotId, {
    isBooked: false,
  });

  res
    .status(200)
    .json(new ApiResponse(200, appointment, "Appointment cancelled"));
});

export const getPrescriptions = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const patient = await PatientModel.findOne({ userId: user._id });
  if (!patient) throw new ApiError(404, "Patient not found");

  const prescriptions = await PrescriptionModel.find({
    patientId: patient._id,
  });

  res.status(200).json(new ApiResponse(200, prescriptions));
});

export const getMedicalReports = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const patient = await PatientModel.findOne({ userId: user._id });
  if (!patient) throw new ApiError(404, "Patient not found");

  const reports = await MedicalReportModel.find({
    patientId: patient._id,
  });

  res.status(200).json(new ApiResponse(200, reports));
});
