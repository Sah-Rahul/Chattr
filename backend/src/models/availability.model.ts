import { Schema, model, Types, Document } from "mongoose";

export interface IAvailabilitySlot extends Document {
  doctorId: Types.ObjectId;
  date: string;  
  startTime: string;  
  endTime: string; 
  isBooked: boolean;
}

const availabilitySchema = new Schema<IAvailabilitySlot>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

availabilitySchema.index(
  { doctorId: 1, date: 1, startTime: 1, endTime: 1 },
  { unique: true }
);

const AvailabilitySlotModel = model<IAvailabilitySlot>(
  "AvailabilitySlot",
  availabilitySchema
);
export default AvailabilitySlotModel;
