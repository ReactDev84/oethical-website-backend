import express from "express";
import { showForm, submitForm } from "../controllers/userController";

// Create Express router
const router = express.Router();

// Route to display the form
router.get("/", showForm);

// Route to handle form submission
router.post("/user", submitForm);

export default router;
