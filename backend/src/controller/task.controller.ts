import { AuthRequest } from "../middleware/auth.middleware";
import StaffModel from "../models/staff.model";
import DoctorModel from "../models/doctor.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler"; 
import TaskModel from "../models/staffTask.model";

export const createTask = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  if (!["doctor", "management"].includes(user.role)) {
    throw new ApiError(403, "Only doctors and management can create tasks");
  }

  const {
    title,
    description,
    assignedTo,
    patientId,
    appointmentId,
    priority,
    dueDate,
  } = req.body;

  if (!title || !assignedTo) {
    throw new ApiError(400, "Title and assignedTo (Staff ID) are required");
  }

  const staff = await StaffModel.findById(assignedTo);
  if (!staff || !staff.isActive) {
    throw new ApiError(404, "Staff not found or inactive");
  }

  let doctorId;
  if (user.role === "doctor") {
    const doctor = await DoctorModel.findOne({ userId: user._id });
    if (!doctor) {
      throw new ApiError(404, "Doctor profile not found");
    }
    doctorId = doctor._id;
  }

  const task = new TaskModel({
    title,
    description,
    ...(doctorId && { doctorId }),
    assignedTo,
    assignedBy: user._id,
    patientId,
    appointmentId,
    priority: priority || "medium",
    dueDate,
    status: "pending",
  });

  await task.save();

  await task.populate([
    {
      path: "doctorId",
      populate: { path: "userId", select: "name email" },
    },
    {
      path: "assignedTo",
      populate: { path: "userId", select: "name email" },
    },
    {
      path: "patientId",
      populate: { path: "userId", select: "name email" },
    },
    { path: "assignedBy", select: "name email role" },
    { path: "appointmentId" },
  ]);

  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

export const getMyCreatedTasks = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  if (!["doctor", "management"].includes(user.role)) {
    throw new ApiError(403, "Access denied");
  }

  const { status, priority } = req.query;

  const query: any = { assignedBy: user._id };

  if (status) query.status = status;
  if (priority) query.priority = priority;

  const tasks = await TaskModel.find(query)
    .populate({
      path: "assignedTo",
      populate: { path: "userId", select: "name email" },
    })
    .populate({
      path: "patientId",
      populate: { path: "userId", select: "name email" },
    })
    .populate({
      path: "doctorId",
      populate: { path: "userId", select: "name email" },
    })
    .populate("assignedBy", "name email role")
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

export const getAllTasks = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  if (user.role !== "management") {
    throw new ApiError(403, "Only management can view all tasks");
  }

  const { status, priority, staffId, doctorId } = req.query;

  const query: any = {};

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (staffId) query.assignedTo = staffId;
  if (doctorId) query.doctorId = doctorId;

  const tasks = await TaskModel.find(query)
    .populate({
      path: "assignedTo",
      populate: { path: "userId", select: "name email" },
    })
    .populate({
      path: "doctorId",
      populate: { path: "userId", select: "name email" },
    })
    .populate("assignedBy", "name email role")
    .populate({
      path: "patientId",
      populate: { path: "userId", select: "name email" },
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
      "All tasks fetched successfully"
    )
  );
});

export const updateTask = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  if (!["doctor", "management"].includes(user.role)) {
    throw new ApiError(403, "Access denied");
  }

  const { taskId } = req.params;
  const { status, priority, dueDate, title, description } = req.body;

  const task = await TaskModel.findOne({
    _id: taskId,
    assignedBy: user._id,
  });

  if (!task) {
    throw new ApiError(
      404,
      "Task not found or you don't have permission to update"
    );
  }

  // Update fields
  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (status) task.status = status;
  if (priority) task.priority = priority;
  if (dueDate) task.dueDate = dueDate;

  await task.save();

  await task.populate([
    {
      path: "assignedTo",
      populate: { path: "userId", select: "name email" },
    },
    {
      path: "doctorId",
      populate: { path: "userId", select: "name email" },
    },
    {
      path: "patientId",
      populate: { path: "userId", select: "name email" },
    },
    { path: "assignedBy", select: "name email role" },
  ]);

  res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});

export const deleteTask = asyncHandler<AuthRequest>(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  if (!["doctor", "management"].includes(user.role)) {
    throw new ApiError(403, "Access denied");
  }

  const { taskId } = req.params;

  const task = await TaskModel.findOne({
    _id: taskId,
    assignedBy: user._id,
  });

  if (!task) {
    throw new ApiError(
      404,
      "Task not found or you don't have permission to delete"
    );
  }

  await TaskModel.findByIdAndDelete(taskId);

  res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));
});
