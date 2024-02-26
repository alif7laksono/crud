import React, { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "../utils/types";
import { useParams, useNavigate } from "react-router-dom";

type RouteParams = {
  id: string;
};

const EditTask: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    completed: false,
    deadline: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cancelClicked, setCancelClicked] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Task>(
          `http://localhost:4000/tasks/${id}`
        );
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
        setError("Error fetching task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.title.trim() === "" || task.description.trim() === "") {
      setError("Title and description are required");
      return;
    }
    try {
      await axios.put(`http://localhost:4000/tasks/${id}`, task);
      if (!cancelClicked) {
        alert("Task updated successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? Any changes will be lost."
      )
    ) {
      setCancelClicked(true);
      navigate("/");
      window.location.reload();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4 p-4 w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={task.title}
              placeholder="Title"
              required
              minLength={1}
              maxLength={250}
              autoFocus
              className="text-base text-gray-500 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={500}
              rows={10}
              className="text-base text-gray-500 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="flex items-center space-x-2 my-2">
            <input
              type="checkbox"
              name="completed"
              checked={task.completed}
              onChange={handleChange}
              className="text-sky-500 focus:ring-sky-500"
            />
            <label className="text-sm text-gray-500">Completed</label>
          </div>
          <input
            type="date"
            name="deadline"
            value={new Date(task.deadline).toISOString().split("T")[0]}
            onChange={handleChange}
            required
            className="text-base text-gray-500 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <div className="flex items-center space-x-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Update Task
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
