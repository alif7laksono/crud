// addTask.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      completed,
      deadline,
    };

    try {
      await axios.post("http://localhost:4000/tasks/", newTask);
      setMessage("Task added successfully");
      setTitle("");
      setDescription("");
      setCompleted(false);
      setDeadline("");
      navigate("/");
    } catch (error) {
      setMessage("An error occurred while adding the task");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <label>Completed</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
