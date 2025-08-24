import { Request, Response } from "express";
import { ScheduleModel } from "../models/scheduleModel";

// Create a new schedule
export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, message } = req.body;
    if (!name || !email || !mobile) {
      return res.status(400).json({ error: "Name, Email, and Mobile are required" });
    }

    const schedules = await ScheduleModel.create({ name, email, mobile, message });
    return res.status(201).json({ message: "Schedule created successfully", schedules });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Create failed" });
  }
};

// Get all schedules
export const getSchedules = async (req: Request, res: Response) => {
  const items = await ScheduleModel.find().sort({ createdAt: -1 });
  return res.json(items);
};

// Get schedule by ID
export const getScheduleByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await ScheduleModel.findById(id);

  if (!item) return res.status(404).json({ error: "Schedule not found" });

  return res.json(item);
};

// Update schedule by ID
export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, message } = req.body;

    const existing = await ScheduleModel.findById(id);
    if (!existing) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    const updates = {
      name: name?.trim() || undefined,
      email: email?.trim() || undefined,
      mobile: mobile?.trim() || undefined,
      message: message?.trim() || undefined,
    };

    const item = await ScheduleModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return res.json({ message: "Schedule updated successfully", schedule: item });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete schedule by ID
export const deleteSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await ScheduleModel.findByIdAndDelete(id);

  if (!item) return res.status(404).json({ error: "Schedule not found" });

  return res.json({ message: "Schedule deleted successfully" });
};
