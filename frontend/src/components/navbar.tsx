// Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h1>Task List</h1>
      <input type="search" placeholder="Search tasks" />
      <Link to="/add-task">
        <button>Add Task</button>
      </Link>
    </nav>
  );
}
