import { Schema, model, Document } from "mongoose";

// Interface for Career document
export interface ICareer extends Document {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Career schema definition
const careerSchema = new Schema<ICareer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10,15}$/, "Invalid mobile number"],
      index: true,
    },
    position: {
      type: String,
      required: true,
      index: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// Export Career model
export const CareerModel = model<ICareer>(
  "careers",
  careerSchema,
  "careerApplications"
);
