import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 500 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    completed: { type: Boolean, default: false },
    deadline: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
