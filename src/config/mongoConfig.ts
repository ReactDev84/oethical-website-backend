import mongoose from "mongoose";

export const connectDB = async (uri: string): Promise<void> => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
