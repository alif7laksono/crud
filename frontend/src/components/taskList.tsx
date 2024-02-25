// taskList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./taskCard";
import { Task } from "../utils/types";
import Navbar from "./navbar";
import TaskFilter from "./TaskFilter";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");

  const tasksPerPage = 6;
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("asc");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:4000/tasks/");
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const handleNext = () => {
    if (page < Math.ceil(tasks.length / tasksPerPage) - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const displayedTasks = tasks
    .filter((task) => {
      return (
        (filterStatus === "all" ||
          (filterStatus === "completed" && task.completed) ||
          (filterStatus === "notCompleted" && !task.completed)) &&
        (task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sortBy === "asc") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else {
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      }
    })
    .slice(page * tasksPerPage, (page + 1) * tasksPerPage);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Navbar search={search} setSearch={setSearch} />
      <TaskFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedTasks.map((task) => (
          <div key={task._id} className="flex items-start space-x-2">
            <div className="flex-grow">
              <TaskCard task={task} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={page === 0}
          className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
            page === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600 focus:ring-sky-500"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={page >= Math.ceil(tasks.length / tasksPerPage) - 1}
          className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
            page >= Math.ceil(tasks.length / tasksPerPage) - 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600 focus:ring-sky-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
