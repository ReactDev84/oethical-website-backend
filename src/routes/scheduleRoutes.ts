import { Router } from "express";
import { 
  createSchedule,
  getSchedules,
  getScheduleByID,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController";

const router = Router();

// Schedule routes
router.post("/createSchedule", createSchedule);          // Create
router.get("/getSchedule", getSchedules);                // Read all
router.get("/getSchedule/:id", getScheduleByID);        // Read by ID
router.patch("/updateSchedule/:id", updateSchedule);     // Update
router.delete("/deleteSchedule/:id", deleteSchedule);    // Delete

export default router;
