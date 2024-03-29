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
    <div className="cursor-pointer p-4 bg-white rounded shadow-lg flex flex-col h-[19rem] hover:shadow-lg transition-shadow duration-200 ease-in">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 capitalize line-clamp-2 h-[3.5rem]">
        {task.title}
      </h2>
      <p className="text-gray-700 mb-2 line-clamp-4 flex-grow">
        {task.description}
      </p>
      <p
        className={
          task.completed
            ? "text-sm text-sky-500 mb-2 h-[1.5rem]"
            : "text-sm text-red-500 mb-2 h-[1.5rem]"
        }
      >
        {task.completed ? "Completed" : "Not Completed"}
      </p>
      <p className="text-sm text-gray-500 mb-4 h-[1.5rem]">
        Deadline:{" "}
        <span className="font-extrabold">
          {new Date(task.deadline).toLocaleDateString()}
        </span>
      </p>
      <div className="flex items-center space-x-4 h-[2rem]">
        <FaTrash
          onClick={handleDelete}
          className="text-gray-500 cursor-pointer hover:text-gray-600 text-lg transform hover:scale-110 transition-transform"
        />
        <Link to={`/edit/${task._id}`}>
          <FaEdit className="text-sky-500 cursor-pointer hover:text-sky-600 text-lg transform hover:scale-110 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
