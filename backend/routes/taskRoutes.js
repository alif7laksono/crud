// routes/taskRoutes.js
import express from "express";
import Task from "../models/taskModel.js";

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

// Add a new task or tasks
router.post("/", async (req, res) => {
  const tasks = Array.isArray(req.body) ? req.body : [req.body];
  const newTasks = await Task.insertMany(tasks);
  res.status(201).json(newTasks);
});

// Update a task by ID
router.put("/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(updatedTask);
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(deletedTask);
});

// Get a task by ID
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

export default router;
