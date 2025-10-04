import React, { createContext, useState } from "react";
import type { ReactNode } from "react";
import { useLoansListings } from "../hooks/useLoansListings";
import { useDebounce } from "@/hooks/useDebounce";
import type { Loan } from "../types";

interface PaginationData {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface LoanListingsContextType {
  // State
  searchQuery: string;
  currentPage: number;
  pageSize: number;
  loans: Loan[];
  pagination: PaginationData;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  handleDownload: () => void;
  refetch: () => void;
}

const LoanListingsContext = createContext<LoanListingsContextType | undefined>(
  undefined
);

export { LoanListingsContext };

interface LoanListingsProviderProps {
  children: ReactNode;
}

export const LoanListingsProvider: React.FC<LoanListingsProviderProps> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const { loans, pagination, isLoading, error, refetch, isFetching } =
    useLoansListings({
      page: currentPage,
      pageSize,
      query: debouncedQuery,
    });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
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

  const contextValue: LoanListingsContextType = {
    // State
    searchQuery,
    currentPage,
    pageSize,
    loans,
    pagination,
    isLoading,
    isFetching,
    error,

    // Actions
    setSearchQuery: handleSearchChange,
    setCurrentPage: handlePageChange,
    setPageSize: handlePageSizeChange,
    handleDownload,
    refetch,
  };

  return (
    <LoanListingsContext.Provider value={contextValue}>
      {children}
    </LoanListingsContext.Provider>
  );
};
