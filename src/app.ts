import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import scheduleRoutes from "./routes/scheduleRoutes";
import careerRoutes from "./routes/careerRoutes";
import { connectDB } from "./config/mongoConfig";
import './config/dotenvConfig'; // Load environment variables

const app = express();
const port = process.env.API_PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,  // from .env
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/schedule", scheduleRoutes);
app.use("/career", careerRoutes);

(async () => {
  await connectDB(process.env.MONGODB_URI as string); // Connect to MongoDB
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})();
