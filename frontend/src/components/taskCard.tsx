// taskCard.tsx
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { Task } from "../utils/types";
import { Link } from "react-router-dom";

type TaskProps = {
  task: Task;
};

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/tasks/${task._id}`);
        window.alert("Task deleted successfully");
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete task", error);
      }
    }
  };
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>{task.completed ? "Completed" : "Not Completed"}</p>
      <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      <FaTrash onClick={handleDelete} />
      <Link to={`/edit/${task._id}`}>
        <FaEdit />
      </Link>
    </div>
  );
};

export default TaskCard;
