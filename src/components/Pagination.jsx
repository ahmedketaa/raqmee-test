import React from "react";

function Pagination({ pageNumbers, action, currentPage }) {
  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => action(number)}
          className={`mx-1 px-3 py-2 border rounded ${
            currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
