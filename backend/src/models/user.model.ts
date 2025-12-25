import mongoose, { Document, Schema } from "mongoose";
import { comparePassword, hashPassword } from "../utils/bcrypt";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  currentWorkspace: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(value: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      trim: true,
      select: true,
    },

    profilePicture: {
      type: String,
      default: null,
    },

    currentWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<UserDocument>("save", async function () {
  if (!this.isModified("password")) return;
  if (!this.password) return;

  this.password = await hashPassword(this.password, 10);
});

userSchema.methods.comparePassword = async function (
  value: string
): Promise<boolean> {
  if (!this.password) return false;

  return comparePassword(value, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;