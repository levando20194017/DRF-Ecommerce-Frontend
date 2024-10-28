import React from "react";

const OrderListPagination = ({ page, pageMax, onPageChange }) => {
  const pages = Array.from({ length: pageMax }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      <div className="d-flex justify-content-center user-pagination">
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a
                className={"page-link" + (page === 1 ? " disabled" : "")}
                href="#"
                aria-label="Previous"
                onClick={() => onPageChange(page > 1 ? page - 1 : page)}
              >
                <span aria-hidden="true">{"<"}</span>
              </a>
            </li>

            {pages.map((pageNumber) => (
              <li
                key={pageNumber}
                className={"page-item" + (page === pageNumber ? " active" : "")}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            ))}

            <li className="page-item">
              <a
                className={"page-link" + (page === pageMax ? " disabled" : "")}
                href="#"
                aria-label="Next"
                onClick={() => onPageChange(page < pageMax ? page + 1 : page)}
              >
                <span aria-hidden="true">{">"}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OrderListPagination;
