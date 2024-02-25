// Navbar.tsx
import { Link } from "react-router-dom";
import { ChangeEvent } from "react";

type NavbarProps = {
  search: string;
  setSearch: (search: string) => void;
};

export default function Navbar({ search, setSearch }: NavbarProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <nav className=" w-full flex items-center justify-between p-6 bg-white shadow">
      <h1 className="text-lg font-semibold text-gray-900">Task List</h1>
      <div className="flex items-center space-x-4">
        <input
          type="search"
          placeholder="Search tasks"
          value={search}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <Link to="/add-task">
          <button className="lg:px-4 px-2 py-2 text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm lg:text-lg">
            Add Task
          </button>
        </Link>
      </div>
    </nav>
  );
}
