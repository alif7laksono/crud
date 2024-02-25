// routes/userRoutes.js
import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Add a new user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Add more routes here if needed

export default router;
