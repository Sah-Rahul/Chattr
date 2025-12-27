import { Schema, model, Types, Document } from "mongoose";

export type TaskType = "assign" | "followup" | "report";
export type TaskStatus = "pending" | "done";

export interface IStaffTask extends Document {
  staffId: Types.ObjectId;
  patientId?: Types.ObjectId;
  appointmentId?: Types.ObjectId;
  taskType: TaskType;
  status: TaskStatus;
}

const staffTaskSchema = new Schema<IStaffTask>(
  {
    staffId: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient" },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
    taskType: {
      type: String,
      enum: ["assign", "followup", "report"],
      required: true,
    },
    status: { type: String, enum: ["pending", "done"], default: "pending" },
  },
  { timestamps: true }
);

const StaffTaskModel = model<IStaffTask>("StaffTask", staffTaskSchema);
export default StaffTaskModel;
