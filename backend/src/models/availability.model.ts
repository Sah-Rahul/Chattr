import { Schema, model, Types, Document } from "mongoose";

export interface IAvailabilitySlot extends Document {
  doctorId: Types.ObjectId;
  date: string;          // YYYY-MM-DD
  startTime: string;     // HH:mm
  endTime: string;       // HH:mm
  isBooked: boolean;
  isActive: boolean;
}

const availabilitySlotSchema = new Schema<IAvailabilitySlot>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },

    date: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    isBooked: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

 
availabilitySlotSchema.index(
  { doctorId: 1, date: 1, startTime: 1, endTime: 1 },
  { unique: true }
);

const AvailabilitySlotModel = model<IAvailabilitySlot>(
  "AvailabilitySlot",
  availabilitySlotSchema
);

export default AvailabilitySlotModel;
