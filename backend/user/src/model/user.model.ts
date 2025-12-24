import mongoose, { Schema, Document } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
}

const userSchema: Schema<Iuser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model<Iuser>("User", userSchema);
export default userModel