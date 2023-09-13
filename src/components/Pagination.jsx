import React from "react";

function Pagination({ currentPage, totalPages, onNextPage, onPrevPage }) {
  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
