import { Schema, model, Types, Document } from "mongoose";

export type ManagementLevel = "admin" | "superadmin";

export interface IManagement extends Document {
  userId: Types.ObjectId;
  level: ManagementLevel;
  isActive: boolean;
}

const managementSchema = new Schema<IManagement>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    level: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

  const ManagementModel = model<IManagement>(
  "Management",
  managementSchema
);
export default ManagementModel