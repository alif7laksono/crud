// taskList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./taskCard";
import { Task } from "../utils/types";
import Navbar from "./navbar";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(0);
  const tasksPerPage = 4;
  const [search, setSearch] = useState("");

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
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(page * tasksPerPage, (page + 1) * tasksPerPage);

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />

      <div className="">
        {displayedTasks.map((task, index) => (
          <div key={task._id}>
            <p> {index + 1 + page * tasksPerPage}</p>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
      <button onClick={handlePrevious} disabled={page === 0}>
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={page >= Math.ceil(tasks.length / tasksPerPage) - 1}
      >
        Next
      </button>
    </div>
  );
};

export default TaskList;
