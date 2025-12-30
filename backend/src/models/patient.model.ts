import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;
  age?: number;
  gender?: "male" | "female" | "other";
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<IPatient>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    age: Number,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    phone: String,
    address: String,
  },
  { timestamps: true }
);

const PatientModel: Model<IPatient> = mongoose.model<IPatient>(
  "Patient",
  patientSchema
);
export default PatientModel;
