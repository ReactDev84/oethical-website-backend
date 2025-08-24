import { Request, Response } from "express";
import { CareerModel } from "../models/careerModel";

// Create new career application
export const createCareer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, position } = req.body;
    const resume = req.file ? req.file.path : undefined; // Uploaded resume path

    if (!name || !email || !phone || !position) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const application = await CareerModel.create({ name, email, phone, position, resume });
    return res.status(201).json({ message: "Application submitted", application });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all career applications
export const getCareers = async (req: Request, res: Response) => {
  const apps = await CareerModel.find().sort({ createdAt: -1 });
  return res.json(apps);
};

// Get a career application by ID
export const getCareerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const app = await CareerModel.findById(id);
  if (!app) return res.status(404).json({ error: "Application not found" });
  return res.json(app);
};

// Update career application
export const updateCareer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, position } = req.body;
    const resume = req.file?.path;

    const existing = await CareerModel.findById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Build updates, trim strings, exclude undefined
    const updates = {
      name: name?.trim() || undefined,
      email: email?.trim() || undefined,
      phone: phone?.trim() || undefined,
      position: position?.trim() || undefined,
      ...(resume && { resume }),
    };
    Object.keys(updates).forEach(key => updates[key as keyof typeof updates] === undefined && delete updates[key as keyof typeof updates]);

    const updated = await CareerModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    return res.json({ message: 'Application updated', updated });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete career application
export const deleteCareer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await CareerModel.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Application not found" });
  return res.json({ message: "Application deleted" });
};
