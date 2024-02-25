// taskList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./taskCard";
import { Task } from "../utils/types";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:4000/tasks/");
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
