import { AuthRequest } from "../middleware/auth.middleware";
import StaffModel from "../models/staff.model";
import PatientModel from "../models/patient.model";
import AppointmentModel from "../models/appointment.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";
import TaskModel from "../models/staffTask.model";

export const getTasks = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "staff") throw new ApiError(403, "Only staff can access");

  const { status, priority } = req.query;

  const staff = await StaffModel.findOne({ userId: user._id });
  if (!staff) throw new ApiError(404, "Staff profile not found");

  const query: any = { assignedTo: staff._id };

  if (status) {
    query.status = status;
  }

  if (priority) {
    query.priority = priority;
  }

  const tasks = await TaskModel.find(query)
    .populate("assignedBy", "name email")
    .populate({
      path: "patientId",
      populate: {
        path: "userId",
        select: "name email",
      },
    })
    .populate("appointmentId")
    .sort({ priority: -1, createdAt: -1 });

  const groupedTasks = {
    pending: tasks.filter((task) => task.status === "pending"),
    inProgress: tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "completed"),
    cancelled: tasks.filter((task) => task.status === "cancelled"),
  };

  const stats = {
    total: tasks.length,
    pending: groupedTasks.pending.length,
    inProgress: groupedTasks.inProgress.length,
    completed: groupedTasks.completed.length,
    high: tasks.filter((t) => t.priority === "high").length,
  };

  res.status(200).json(
    new ApiResponse(
      200,
      {
        tasks: groupedTasks,
        allTasks: tasks,
        stats,
      },
      "Tasks fetched successfully"
    )
  );
});

export const updateTaskStatus = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "staff") throw new ApiError(403, "Only staff can access");

  const { taskId } = req.params;
  const { status } = req.body;

  if (!["pending", "in-progress", "completed", "cancelled"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const staff = await StaffModel.findOne({ userId: user._id });
  if (!staff) throw new ApiError(404, "Staff profile not found");

  const task = await TaskModel.findOne({
    _id: taskId,
    assignedTo: staff._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found or not assigned to you");
  }

  task.status = status;

  if (status === "completed") {
    task.completedAt = new Date();
  }

  await task.save();

  res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully"));
});

export const getPatientDetailsForTask = asyncHandler<AuthRequest>(
  async (req, res) => {
    const user = req.user;
    if (!user) throw new ApiError(401, "Unauthorized");
    if (user.role !== "staff") throw new ApiError(403, "Only staff can access");

    const { taskId } = req.params;

    const staff = await StaffModel.findOne({ userId: user._id });
    if (!staff) throw new ApiError(404, "Staff profile not found");

    const task = await TaskModel.findOne({
      _id: taskId,
      assignedTo: staff._id,
    })
      .populate("patientId")
      .populate("appointmentId");

    if (!task) {
      throw new ApiError(404, "Task not found or not assigned to you");
    }

    if (!task.patientId) {
      throw new ApiError(404, "No patient associated with this task");
    }

    const patient = await PatientModel.findById(task.patientId).populate(
      "userId",
      "name email"
    );

    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    let appointment;
    if (task.appointmentId) {
      appointment = await AppointmentModel.findById(task.appointmentId)
        .populate("doctorId")
        .populate("slotId");
    }

    const recentAppointments = await AppointmentModel.find({
      patientId: patient._id,
    })
      .populate("doctorId")
      .populate("slotId")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          task,
          patient,
          appointment: appointment || null,
          recentAppointments,
        },
        "Patient details fetched successfully"
      )
    );
  }
);

export const updateStaffProfile = asyncHandler<AuthRequest>(
  async (req, res) => {
    const user = req.user;
    if (!user) throw new ApiError(401, "Unauthorized");
    if (user.role !== "staff") throw new ApiError(403, "Only staff can access");

    const { designation, shift, departmentId } = req.body;

    const staff = await StaffModel.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          designation,
          shift,
          departmentId,
        },
      },
      { new: true, runValidators: true }
    );

    if (!staff) {
      throw new ApiError(404, "Staff profile not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, staff, "Profile updated successfully"));
  }
);

export const getStaffProfile = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.role !== "staff") throw new ApiError(403, "Only staff can access");

  const staff = await StaffModel.findOne({ userId: user._id })
    .populate("userId", "name email")
    .populate("departmentId");

  if (!staff) {
    throw new ApiError(404, "Staff profile not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, staff, "Profile fetched successfully"));
});
