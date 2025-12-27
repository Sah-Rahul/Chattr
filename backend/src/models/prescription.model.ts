import { Schema, model, Types, Document } from "mongoose";

export interface IPrescription extends Document {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  appointmentId?: Types.ObjectId;
  medicines: string[];
  instructions?: string;
}

const prescriptionSchema = new Schema<IPrescription>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
    medicines: [{ type: String, required: true }],
    instructions: { type: String },
  },
  { timestamps: true }
);

  const PrescriptionModel = model<IPrescription>(
  "Prescription",
  prescriptionSchema
);

export default PrescriptionModel