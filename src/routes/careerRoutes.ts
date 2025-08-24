import { Router } from "express";
import multer from "multer";

import {
  createCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
} from "../controllers/careerController";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/resumes",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/createCareer", upload.single("resume"), createCareer);                  // Create
router.get("/getCareer", getCareers);                                                 // Read all
router.get("/getCareer/:id", getCareerById);                                          // Read by ID
router.patch("/updateCareer/:id", upload.single("resume"), updateCareer);             // Update
router.delete("/deleteCareer/:id", deleteCareer);                                     // Delete

export default router;
