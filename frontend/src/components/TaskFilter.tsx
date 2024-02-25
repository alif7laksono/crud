import React from "react";

interface TaskFilterProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="w-full flex items-center justify-between p-6 bg-white shadow">
      <div>
        <div className="">
          <label className="block text-sm text-gray-700 mb-2">Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm text-gray-700 mb-2">
          Sort by Deadline:
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
