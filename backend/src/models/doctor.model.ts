import mongoose, { Document, Model, Schema } from "mongoose";

export type DoctorStatus = "pending" | "approved";

export interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId;
  specialization: string;
  qualification?: string;
  experience?: number;
  age?: number;
  description?: string;
  image?: string;
  status: DoctorStatus;
  createdAt: Date;
  updatedAt: Date;
}

const doctorSchema = new Schema<IDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: { type: String, required: true },
    qualification: String,
    experience: Number,
    age: Number,
    description: String,
    image: String,
    status: {
      type: String, 
      default: "approved",
    },
  },
  { timestamps: true }
);

const DoctorModel: Model<IDoctor> = mongoose.model<IDoctor>(
  "Doctor",
  doctorSchema
);
export default DoctorModel;
