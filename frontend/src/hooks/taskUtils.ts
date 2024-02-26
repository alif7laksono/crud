// taskUtils.ts
import { Task } from "../utils/types";

export function filterAndSortTasks(
  tasks: Task[],
  filterStatus: string,
  search: string,
  sortBy: string,
  page: number,
  tasksPerPage: number
): Task[] {
  return tasks
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
}
