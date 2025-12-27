import { Document, Schema, model } from "mongoose";

export type UserRole = "patient" | "doctor" | "staff" | "management";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  isDeleted: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false  },
    role: {
      type: String,
      enum: ["patient", "doctor", "staff", "management"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
