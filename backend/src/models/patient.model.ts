import { Schema, model, Types, Document } from "mongoose";

export interface IPatient extends Document {
  userId: Types.ObjectId;
  age?: number;
  gender?: string;
  bloodGroup?: string;
  emergencyContact?: string;
}

const patientSchema = new Schema<IPatient>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    age: Number,
    gender: String,
    bloodGroup: String,
    emergencyContact: String,
  },
  { timestamps: true }
);

const PatientModel = model<IPatient>("Patient", patientSchema);
export default PatientModel;
