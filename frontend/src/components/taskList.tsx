// taskList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./taskCard";
import Navbar from "./navbar";
import TaskFilter from "./TaskFilter";
import { Task } from "../utils/types";
import { filterAndSortTasks } from "../hooks/taskUtils";
import Pagination from "./Pagination";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const tasksPerPage = 6;
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("asc");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/tasks/");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
      setLoading(false);
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

  const displayedTasks = filterAndSortTasks(
    tasks,
    filterStatus,
    search,
    sortBy,
    page,
    tasksPerPage
  );

  if (loading) {
    return <div>Loading...</div>;
  }

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
      
      <Pagination
        page={page}
        totalPages={Math.ceil(tasks.length / tasksPerPage)}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  );
};

export default TaskList;
