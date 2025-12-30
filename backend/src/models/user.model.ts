import mongoose, { Document, Model, Schema } from "mongoose";

export type UserRole = "patient" | "doctor" | "management";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["patient", "doctor", "management"],
      default: "patient",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default UserModel;
