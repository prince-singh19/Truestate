import React from "react";

const PaginationControls = ({ pagination, dispatch }) => {
  const { currentPage, totalPages } = pagination;
  const MAX_VISIBLE = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch({ type: "SET_PAGE", payload: page });
    }
  };

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE / 2));
    let end = start + MAX_VISIBLE - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - MAX_VISIBLE + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center py-4 border-t bg-white">
      <div className="flex gap-2">
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded-md border text-sm font-medium transition
              ${
                page === currentPage
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationControls;
