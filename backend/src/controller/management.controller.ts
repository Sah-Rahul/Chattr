// controller/management.controller.ts
import { AuthRequest } from "../middleware/auth.middleware";
import DoctorModel from "../models/doctor.model";
import StaffModel from "../models/staff.model";
import UserModel from "../models/user.model";
import TaskModel from "../models/staffTask.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";
import bcrypt from "bcrypt";
import { uploadToCloudinary } from "../services/cloudinary.service";

export const addDoctor = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can add doctors");

  const {
    name,
    email,
    password,
    specialization,
    qualification,
    description,
    experience,
    age,
  } = req.body;

  if (!req.file) {
    throw new ApiError(400, "Doctor profile image is required");
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const uploadResult = await uploadToCloudinary(
    req.file.buffer,
    "hospital/doctors"
  );

  const hashedPassword = await bcrypt.hash(password, 10);
  const doctorUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role: "doctor",
  });

  const doctor = await DoctorModel.create({
    userId: doctorUser._id,
    specialization,
    qualification,
    experience,
    age,
    description,
    file: uploadResult.secure_url,
    status: "approved",
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: doctorUser, profile: doctor },
        "Doctor added successfully"
      )
    );
});

export const getAllDoctors = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can view doctors");

  const { status } = req.query;

  const query: any = {};
  if (status) query.status = status;

  const doctors = await DoctorModel.find(query)
    .populate("userId", "name email isActive")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, doctors, "Doctors fetched successfully"));
});

export const updateDoctor = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can update doctors");

  const { doctorId } = req.params;
  const { specialization, qualification, description, experience, age } =
    req.body;

  const doctor = await DoctorModel.findById(doctorId);
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  if (specialization) doctor.specialization = specialization;
  if (qualification) doctor.qualification = qualification;
  if (description) doctor.description = description;
  if (experience) doctor.experience = experience;
  if (age) doctor.age = age;

  if (req.file) {
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      "hospital/doctors"
    );
    doctor.file = uploadResult.secure_url;
  }

  await doctor.save();

  res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor updated successfully"));
});

export const updateDoctorStatus = asyncHandler<AuthRequest>(
  async (req, res) => {
    const user = req.user;
    if (!user) throw new ApiError(401, "Unauthorized");
    if (user.role !== "management")
      throw new ApiError(403, "Only management can update doctor status");

    const { doctorId } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      throw new ApiError(400, "Invalid status");
    }

    const doctor = await DoctorModel.findByIdAndUpdate(
      doctorId,
      { $set: { status } },
      { new: true }
    ).populate("userId", "name email");

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, doctor, `Doctor ${status} successfully`));
  }
);

export const deleteDoctor = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can delete doctors");

  const { doctorId } = req.params;

  const doctor = await DoctorModel.findById(doctorId);
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  await UserModel.findByIdAndUpdate(doctor.userId, {
    isActive: false,
    isDeleted: true,
  });

  await DoctorModel.findByIdAndDelete(doctorId);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Doctor deleted successfully"));
});

export const addStaff = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can add staff");

  const { name, email, password, designation, shift, departmentId } = req.body;

  if (!req.file) {
    throw new ApiError(400, "Staff profile image is required");
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const uploadResult = await uploadToCloudinary(
    req.file.buffer,
    "hospital/staff"
  );

  const hashedPassword = await bcrypt.hash(password, 10);
  const staffUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role: "staff",
  });

  const staff = await StaffModel.create({
    userId: staffUser._id,
    designation,
    shift,
    departmentId,
    file: uploadResult.secure_url,
    isActive: true,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: staffUser, profile: staff },
        "Staff added successfully"
      )
    );
});

export const getAllStaff = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can view staff");

  const { isActive, shift, departmentId } = req.query;

  const query: any = {};
  if (isActive !== undefined) query.isActive = isActive === "true";
  if (shift) query.shift = shift;
  if (departmentId) query.departmentId = departmentId;

  const staff = await StaffModel.find(query)
    .populate("userId", "name email isActive")
    .populate("departmentId")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, staff, "Staff fetched successfully"));
});

export const updateStaff = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can update staff");

  const { staffId } = req.params;
  const { designation, shift, departmentId, isActive } = req.body;

  const staff = await StaffModel.findById(staffId);
  if (!staff) {
    throw new ApiError(404, "Staff not found");
  }

  if (designation) staff.designation = designation;
  if (shift) staff.shift = shift;
  if (departmentId) staff.departmentId = departmentId;
  if (isActive !== undefined) staff.isActive = isActive;

  if (req.file) {
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      "hospital/staff"
    );
    staff.file = uploadResult.secure_url;
  }

  await staff.save();

  res
    .status(200)
    .json(new ApiResponse(200, staff, "Staff updated successfully"));
});

export const deleteStaff = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can delete staff");

  const { staffId } = req.params;

  const staff = await StaffModel.findById(staffId);
  if (!staff) {
    throw new ApiError(404, "Staff not found");
  }

  await UserModel.findByIdAndUpdate(staff.userId, {
    isActive: false,
    isDeleted: true,
  });

  await StaffModel.findByIdAndDelete(staffId);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Staff deleted successfully"));
});

export const getDashboardStats = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "management")
    throw new ApiError(403, "Only management can view stats");

  const totalDoctors = await DoctorModel.countDocuments({ status: "approved" });
  const totalStaff = await StaffModel.countDocuments({ isActive: true });
  const totalPatients = await UserModel.countDocuments({
    role: "patient",
    isActive: true,
  });

  const totalTasks = await TaskModel.countDocuments();
  const pendingTasks = await TaskModel.countDocuments({ status: "pending" });
  const inProgressTasks = await TaskModel.countDocuments({
    status: "in-progress",
  });
  const completedTasks = await TaskModel.countDocuments({
    status: "completed",
  });

  const pendingDoctors = await DoctorModel.countDocuments({
    status: "pending",
  });

  const recentTasks = await TaskModel.find()
    .populate("assignedTo", "designation")
    .populate("assignedBy", "name role")
    .sort({ createdAt: -1 })
    .limit(10);

  const stats = {
    overview: {
      totalDoctors,
      totalStaff,
      totalPatients,
      pendingDoctors,
    },
    tasks: {
      total: totalTasks,
      pending: pendingTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
    },
    recentTasks,
  };

  res
    .status(200)
    .json(new ApiResponse(200, stats, "Stats fetched successfully"));
});
