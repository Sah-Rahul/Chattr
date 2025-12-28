import { Schema, model, Types, Document } from "mongoose";

export interface IStaff extends Document {
  userId: Types.ObjectId;
  departmentId?: Types.ObjectId;
  designation: string;
  shift?: "morning" | "evening" | "night";
  isActive: boolean;
  file: string
}

const staffSchema = new Schema<IStaff>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    designation: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      enum: ["morning", "evening", "night"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
     file: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const StaffModel = model<IStaff>("Staff", staffSchema);
export default StaffModel;
