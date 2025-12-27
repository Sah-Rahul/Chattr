import { Schema, model, Types, Document } from "mongoose";

export type ReportType =
  | "lab"
  | "xray"
  | "mri"
  | "ct"
  | "prescription"
  | "other";

export interface IMedicalReport extends Document {
  patientId: Types.ObjectId;
  doctorId?: Types.ObjectId;
  appointmentId?: Types.ObjectId;
  reportType: ReportType;
  title: string;
  description?: string;
  fileUrl?: string;
  createdAt: Date;
}

const medicalReportSchema = new Schema<IMedicalReport>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },

    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },

    reportType: {
      type: String,
      enum: ["lab", "xray", "mri", "ct", "prescription", "other"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    fileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const MedicalReportModel = model<IMedicalReport>(
  "MedicalReport",
  medicalReportSchema
);

export default MedicalReportModel;
