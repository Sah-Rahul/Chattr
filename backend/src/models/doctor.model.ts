import { Schema, model, Types, Document } from "mongoose";

export interface IDoctor extends Document {
  userId: Types.ObjectId;
  departmentId?: Types.ObjectId;
  specialization: string;
  qualification: string;
  experience: number;
  age: number;
  status: "pending" | "approved" | "rejected";
}

const doctorSchema = new Schema<IDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one user = one doctor
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    specialization: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    age: {
      type: Number,
      required: true,
      min: 21,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

  const DoctorModel = model<IDoctor>("Doctor", doctorSchema);

  export default DoctorModel