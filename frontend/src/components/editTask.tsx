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

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get<Task>(
          `http://localhost:4000/tasks/${id}`
        );
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
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
    try {
      await axios.put(`http://localhost:4000/tasks/${id}`, task);
      alert("Task updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h2 className="text-2xl font-semibold text-gray-900">Edit Task</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
            className="text-sky-500 focus:ring-sky-500"
          />
          <label htmlFor="completed" className="text-sm text-gray-700">
            Completed
          </label>
        </div>
        <input
          type="date"
          name="deadline"
          value={new Date(task.deadline).toISOString().split("T")[0]}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <div className="flex items-center space-x-4 mt-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Update Task
          </button>
          <button
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
