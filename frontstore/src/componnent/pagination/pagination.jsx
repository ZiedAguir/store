

import { useEffect } from "react";

function Pagination({ pagination, results, setPage }) {
  useEffect(() => {
    console.log(pagination);
  }, [pagination]);

  const { currentPage, numberOfPages, next, prev } = pagination;

  // Function to handle page changes with bounds checking
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= numberOfPages) {
      setPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5; 
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, numberOfPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="row row-gutter-sm justify-content-between">
      <div className="col-lg-auto order-2 order-lg-1">
        <p className="text-center text-lg-left mb-0">
          Showing page {currentPage} of {numberOfPages} ({results} results)
        </p>
      </div>
      <div className="col-lg-auto order-1 order-lg-2 mb-3 mb-lg-0">
        <nav aria-label="Page navigation">
          <ul className="pagination pagination-modern pagination-modern-spacing justify-content-center justify-content-lg-start mb-0">
            {prev && (
              <li className="page-item">
                <button
                  className="page-link prev"
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous"
                >
                  <i className="fas fa-chevron-left" />
                </button>
              </li>
            )}

            {getPageNumbers().map((pageNum) => (
              <li
                key={pageNum}
                className={`page-item ${currentPage === pageNum ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNum)}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </button>
              </li>
            ))}

            {next && (
              <li className="page-item">
                <button
                  className="page-link next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next"
                >
                  <i className="fas fa-chevron-right" />
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;