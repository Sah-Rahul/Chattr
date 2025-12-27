import { Types } from "mongoose";
import { AuthRequest } from "../middleware/auth.middleware";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandler";
import DoctorModel from "../models/doctor.model";
import AvailabilitySlotModel from "../models/availability.model";
import { ApiResponse } from "../utils/ApiResponse";
import AppointmentModel from "../models/appointment.model";
import PatientModel from "../models/patient.model";
import PrescriptionModel from "../models/prescription.model";
import MedicalReportModel from "../models/medicalReport.model";

export const getTodayAppointments = asyncHandler<AuthRequest>(
  async (req, res) => {
    const user = req.user;
    if (!user || user.role !== "doctor") {
      throw new ApiError(401, "Unauthorized");
    }

    const doctor = await DoctorModel.findOne({ userId: user._id });
    if (!doctor) {
      throw new ApiError(404, "Doctor profile not found");
    }

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    console.log("Today's date:", todayStr);
    console.log("Doctor ID:", doctor._id);

    const todaySlots = await AvailabilitySlotModel.find({
      doctorId: doctor._id,
      date: todayStr,
    });

    console.log("Today's slots:", todaySlots);
    console.log("Slot count:", todaySlots.length);

    const allSlots = await AvailabilitySlotModel.find({
      doctorId: doctor._id,
    });
    console.log("All slots for doctor:", allSlots);

    const slotIds = todaySlots.map((slot) => slot._id);
    console.log("Slot IDs:", slotIds);

    const appointments = await AppointmentModel.find({
      doctorId: doctor._id,
      slotId: { $in: slotIds },
    })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .populate("slotId");

    console.log("Appointments found:", appointments);

    const groupedAppointments = {
      pending: appointments.filter((apt) => apt.status === "pending"),
      accepted: appointments.filter((apt) => apt.status === "accepted"),
      completed: appointments.filter((apt) => apt.status === "completed"),
      cancelled: appointments.filter((apt) => apt.status === "cancelled"),
    };

    res.status(200).json(
      new ApiResponse(
        200,
        {
          date: todayStr,
          total: appointments.length,
          appointments: groupedAppointments,
          allAppointments: appointments,
          debug: {
            todaySlots: todaySlots.length,
            allSlots: allSlots.length,
            slotIds,
          },
        },
        "Today's appointments fetched successfully"
      )
    );
  }
);

export const acceptAppointment = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;

  if (!user || user.role !== "doctor") {
    throw new ApiError(401, "Unauthorized");
  }

  const { appointmentId } = req.params;

  const doctor = await DoctorModel.findOne({ userId: user._id });

  if (!doctor) {
    throw new ApiError(404, "Doctor profile not found");
  }

  const appointment = await AppointmentModel.findOne({
    _id: appointmentId,
    doctorId: doctor._id,
    status: "pending",
  });

  if (!appointment) {
    throw new ApiError(404, "Appointment not found or cannot be accepted");
  }

  appointment.status = "accepted";
  await appointment.save();

  res
    .status(200)
    .json(new ApiResponse(200, appointment, "Appointment accepted"));
});

export const rejectAppointment = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user || user.role !== "doctor") {
    throw new ApiError(401, "Unauthorized");
  }

  const { appointmentId } = req.params;

  const doctor = await DoctorModel.findOne({ userId: user._id });
  if (!doctor) {
    throw new ApiError(404, "Doctor profile not found");
  }

  const appointment = await AppointmentModel.findOne({
    _id: appointmentId,
    doctorId: doctor._id,
    status: "pending",
  });

  if (!appointment) {
    throw new ApiError(404, "Appointment not found or cannot be rejected");
  }

  appointment.status = "cancelled";
  await appointment.save();

  await AvailabilitySlotModel.findByIdAndUpdate(appointment.slotId, {
    isBooked: false,
  });

  res
    .status(200)
    .json(new ApiResponse(200, appointment, "Appointment rejected"));
});

export const getPatientHistory = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user || user.role !== "doctor") {
    throw new ApiError(401, "Unauthorized");
  }

  const { patientId } = req.params;

  const doctor = await DoctorModel.findOne({ userId: user._id });
  if (!doctor) {
    throw new ApiError(404, "Doctor profile not found");
  }

  const patient = await PatientModel.findById(patientId).populate(
    "userId",
    "name email"
  );
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const appointments = await AppointmentModel.find({
    patientId,
    doctorId: doctor._id,
    status: { $in: ["accepted", "completed"] },
  })
    .populate("slotId")
    .sort({ createdAt: -1 });

  const prescriptions = await PrescriptionModel.find({
    patientId,
    doctorId: doctor._id,
  }).sort({ createdAt: -1 });

  const medicalReports = await MedicalReportModel.find({
    patientId,
  }).sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        patient,
        appointments,
        prescriptions,
        // medicalReports,
      },
      "Patient history fetched successfully"
    )
  );
});

export const addPrescription = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user || user.role !== "doctor") {
    throw new ApiError(401, "Unauthorized");
  }

  const { appointmentId } = req.params;
  const { medicines } = req.body;

  if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
    throw new ApiError(400, "medicines are required");
  }

  const doctor = await DoctorModel.findOne({ userId: user._id });
  if (!doctor) {
    throw new ApiError(404, "Doctor profile not found");
  }

  const appointment = await AppointmentModel.findOne({
    _id: appointmentId,
    doctorId: doctor._id,
    status: "accepted",
  });

  if (!appointment) {
    throw new ApiError(404, "Appointment not found or not in accepted state");
  }

  const prescription = await PrescriptionModel.create({
    appointmentId,
    patientId: appointment.patientId,
    doctorId: doctor._id,
    medicines,
  });

  appointment.status = "completed";
  await appointment.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, prescription, "Prescription added successfully")
    );
});

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

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ApiError(400, "Invalid date format. Use YYYY-MM-DD");
    }

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
