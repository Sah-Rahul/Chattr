import { Schema, model, Types, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  doctorId?: Types.ObjectId;
  assignedTo: Types.ObjectId;
  assignedBy: Types.ObjectId;
  patientId?: Types.ObjectId;
  appointmentId?: Types.ObjectId;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  dueDate?: Date;
  completedAt?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      index: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
      index: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    dueDate: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const TaskModel = model<ITask>("Task", taskSchema);
export default TaskModel;
