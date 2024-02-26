// addTask.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      setError("Title and description are required");
      return;
    }

    if (!window.confirm("Are you sure you want to add this task?")) {
      return;
    }

    setError("");
    setTitle("");
    setDescription("");
    setCompleted(false);
    setDeadline("");

    const newTask = {
      title,
      description,
      completed,
      deadline,
    };

    try {
      await axios.post("http://localhost:4000/tasks/", newTask);
      setTitle("");
      setDescription("");
      setCompleted(false);
      setDeadline("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    window.alert("Task added successfully");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4 p-4 w-full">
          <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                minLength={1}
                maxLength={250}
                autoFocus
                className="text-base text-gray-500 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                minLength={5}
                maxLength={500}
                rows={10}
                className="text-base text-gray-500 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="text-sky-500 focus:ring-sky-500"
                />
                <label className="text-sm text-gray-500">Completed</label>
              </div>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="text-base text-gray-500 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
