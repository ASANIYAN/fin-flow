import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage?: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  perPage = 10,
  totalItems = 0,
  onPageChange,
  onPerPageChange,
  disabled = false,
}) => {
  const [localPerPage, setLocalPerPage] = useState(perPage.toString());

  // Debounce the per page value to prevent multiple API calls
  const debouncedPerPage = useDebounce(localPerPage, 1500);

  // Update local state when perPage prop changes
  useEffect(() => {
    setLocalPerPage(perPage.toString());
  }, [perPage]);

  // Handle debounced per page changes
  useEffect(() => {
    const numValue = parseInt(debouncedPerPage);
    if (
      !isNaN(numValue) &&
      numValue >= 1 &&
      numValue !== perPage &&
      onPerPageChange
    ) {
      onPerPageChange(numValue);
    }
  }, [debouncedPerPage, perPage, onPerPageChange]);

  // Show only 4 page numbers at a time
  let startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 3);
  if (endPage - startPage < 3) {
    startPage = Math.max(1, endPage - 3);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePerPageInputChange = (value: string) => {
    // Allow empty string or positive numbers only
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setLocalPerPage(value);
    }
  };

  const handleIncrement = () => {
    const currentValue = parseInt(localPerPage) || 1;
    const maxValue = Math.max(totalItems, 1); // Don't exceed total items
    if (currentValue < maxValue) {
      const newValue = currentValue + 1;
      setLocalPerPage(newValue.toString());
    }
  };

  const handleDecrement = () => {
    const currentValue = parseInt(localPerPage) || 1;
    if (currentValue > 1) {
      const newValue = currentValue - 1;
      setLocalPerPage(newValue.toString());
    }
  };

  const handleInputBlur = () => {
    // Ensure value is between 1 and totalItems when input loses focus
    const numValue = parseInt(localPerPage);
    const maxValue = Math.max(totalItems, 1); // Ensure at least 1

    if (isNaN(numValue) || numValue < 1) {
      setLocalPerPage("1");
    } else if (numValue > maxValue) {
      setLocalPerPage(maxValue.toString());
    }
  };

  const showingTo = Math.min(currentPage * perPage, totalItems);

  return (
    <nav
      className="w-full flex justify-between items-center"
      role="navigation"
      aria-label="Pagination navigation"
    >
      <span
        className="text-gray-600 text-sm block"
        aria-live="polite"
        id="pagination-info"
      >
        {`Showing ${showingTo} from ${totalItems} data`}
      </span>

      {/* Center - Rows per page selector */}
      <div className="flex items-center gap-4">
        <label htmlFor="rows-per-page" className="text-sm text-gray-700">
          Rows per page
        </label>
        <div className="relative">
          <div className="flex items-center justify-between border border-[--color-brand-primary]/40 rounded-lg bg-blue-50 p-2 w-fit h-8.5">
            <input
              id="rows-per-page"
              type="text"
              value={localPerPage}
              onChange={(e) => handlePerPageInputChange(e.target.value)}
              onBlur={handleInputBlur}
              disabled={disabled}
              className="bg-transparent border-none text-left outline-none text-xs font-medium text-gray-800 w-8.5"
              aria-label="Number of rows per page"
              aria-describedby="pagination-info"
            />
            <div className="flex flex-col">
              <button
                onClick={handleIncrement}
                disabled={
                  disabled || parseInt(localPerPage) >= Math.max(totalItems, 1)
                }
                className="border-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-label="Increase rows per page"
                type="button"
              >
                <Icon
                  width={14}
                  height={10}
                  icon="bxs:up-arrow"
                  color="var(--color-brand-primary)"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={handleDecrement}
                disabled={disabled || parseInt(localPerPage) <= 1}
                className="border-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-label="Decrease rows per page"
                type="button"
              >
                <Icon
                  width={14}
                  height={10}
                  icon="bxs:up-arrow"
                  className="rotate-180"
                  color="var(--color-brand-primary)"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-4 h-10"
        role="group"
        aria-label="Pagination controls"
      >
        <button
          className={`h-full w-28.5 text-xs rounded bg-gray-400 text-white font-medium flex justify-center items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
            currentPage === 1 || disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[--color-brand-primary] hover:bg-[--color-brand-primary]/90"
          }`}
          disabled={currentPage === 1 || disabled}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Go to previous page"
          type="button"
        >
          <Icon
            color="#EEEAEA"
            icon="material-symbols-light:keyboard-double-arrow-left"
            aria-hidden="true"
          />{" "}
          Previous
        </button>
        <div
          className="flex gap-2 bg-gray-200"
          role="group"
          aria-label="Page numbers"
        >
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded font-semibold text-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                page === currentPage
                  ? "bg-white text-gray-800 rounded"
                  : " text-gray-600 cursor-pointer"
              }`}
              onClick={() => onPageChange(page)}
              disabled={disabled}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              type="button"
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className={`h-full w-21.5 rounded font-medium text-xs flex items-center justify-center gap-1 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary ${
            currentPage === totalPages || disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[--color-brand-primary] hover:bg-[--color-brand-primary]/90"
          }`}
          disabled={currentPage === totalPages || disabled}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Go to next page"
          type="button"
        >
          Next{" "}
          <Icon
            color="#EEEAEA"
            icon="material-symbols-light:double-arrow"
            aria-hidden="true"
          />{" "}
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
