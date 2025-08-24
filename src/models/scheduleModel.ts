import { Schema, model, Document } from "mongoose";

export interface ISchedule extends Document {
  name: string;
  email: string;
  mobile: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const scheduleSchema = new Schema<ISchedule>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
      index: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10,15}$/, "Invalid mobile"],
      index: true,
    },
    message: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
  },
  { timestamps: true } // createdAt and updatedAt fields
);

export const ScheduleModel = model<ISchedule>(
  "Schedule",
  scheduleSchema,
  "scheduleFreeDemo"
);
