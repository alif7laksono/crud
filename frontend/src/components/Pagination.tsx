// Pagination.tsx
import React from "react";
import { PaginationProps } from "../utils/types";

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  handlePrevious,
  handleNext,
}) => {
  return (
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
        disabled={page >= totalPages - 1}
        className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
          page >= totalPages - 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-sky-500 hover:bg-sky-600 focus:ring-sky-500"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
