import { Schema, model, Types, Document } from "mongoose";

export type AppointmentStatus =
  | "pending"
  | "accepted"
  | "completed"
  | "cancelled";
export type AppointmentCreatedBy = "patient" | "staff";

export interface IAppointment extends Document {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  slotId?: Types.ObjectId;
  status: AppointmentStatus;
  createdBy: AppointmentCreatedBy;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    slotId: { type: Schema.Types.ObjectId, ref: "AvailabilitySlot" },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
    },
    createdBy: {
      type: String,
      enum: ["patient", "staff"],
      required: true,
    },
  },
  { timestamps: true }
);

const AppointmentModel = model<IAppointment>("Appointment", appointmentSchema);
export default AppointmentModel;
