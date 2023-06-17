import React from "react";

const Pagination = ({ blogsPerPage, totalBlogs, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center list-none">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              currentPage === number ? "active" : ""
            }`}
          >
            <button
              onClick={() => paginate(number)}
              className={`page-link px-3 py-2 mx-2 mt-2 mb-1 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === number ? "bg-gray-200" : ""
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
