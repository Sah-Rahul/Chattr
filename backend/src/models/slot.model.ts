import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISlot extends Document {
  doctorId: mongoose.Types.ObjectId;
  date: string;        
  startTime: string;  
  endTime: string;      
  isBooked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const slotSchema = new Schema<ISlot>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SlotModel: Model<ISlot> = mongoose.model<ISlot>("Slot", slotSchema);
export default SlotModel;
