import mongoose, { Document, Model, Schema } from "mongoose";

export type AppointmentStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled"
  | "completed";

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  slotId: mongoose.Types.ObjectId;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const AppointmentModel: Model<IAppointment> = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);

export default AppointmentModel;
