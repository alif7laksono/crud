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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
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
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <input
          type="date"
          name="deadline"
          value={new Date(task.deadline).toISOString().split("T")[0]}
          onChange={handleChange}
        />
        <button type="submit">Update Task</button>{" "}
        <button
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          Cancel
        </button>{" "}
      </form>
    </div>
  );
};

export default EditTask;
