import express from "express";
import bodyParser from "body-parser";
import userRoutes from './routes/userRoutes';
import './config/dotenvConfig'; // Load environment variables from .env

const app = express();
const port = process.env.API_PORT || 3000;

// Parse form data from POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Register user routes
app.use("/", userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

