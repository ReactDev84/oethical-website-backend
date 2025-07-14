import { Request, Response } from "express";
import { User } from "../models/userModel";

// Show HTML form
export const showForm = (req: Request, res: Response) => {
    res.sendFile("form.html", { root: "./src/views" });
};

// Handle form submission
export const submitForm = (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        email: req.body.email,
    };
    console.log("Username and Email Submitted:", user.username, "and", user.email);
    res.send(`<h1>Username and Email Received: ${user.username} and ${user.email}</h1>`);
};
