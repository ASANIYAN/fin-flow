import { useState } from "react";
import { useLoansListings } from "./useLoansListings";
import { useDebounce } from "@/hooks/useDebounce";
import type { Loan } from "../types";

interface PaginationData {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface LoanListingsState {
  searchQuery: string;
  loans: Loan[];
  pagination: PaginationData;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  currentPage: number;
  pageSize: number;
}

export interface LoanListingsActions {
  handleSearchChange: (value: string) => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  handleDownload: () => void;
  refetch: () => void;
}

export const useLoanListingsState = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce search query to avoid too many API calls
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { loans, pagination, isLoading, isFetching, error, refetch } =
    useLoansListings({
      page: currentPage,
      pageSize,
      query: debouncedQuery,
    });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Reset to first page when searching
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    // Reset to first page when changing page size
    setCurrentPage(1);
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log("Downloading loan listings report...");
  };

  const state: LoanListingsState = {
    searchQuery,
    loans,
    pagination,
    isLoading,
    isFetching,
    error,
    currentPage,
    pageSize,
  };

  const actions: LoanListingsActions = {
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
    handleDownload,
    refetch,
  };

  return {
    ...state,
    ...actions,
  };
};
