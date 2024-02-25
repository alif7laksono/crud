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
    <nav>
      <h1>Task List</h1>
      <input
        type="search"
        placeholder="Search tasks"
        value={search}
        onChange={handleSearchChange}
      />
      <Link to="/add-task">
        <button>Add Task</button>
      </Link>
    </nav>
  );
}
