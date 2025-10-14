import React, { createContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import type { UserLoan } from "../types";
import { useUserLoansQuery } from "../hooks/useUserLoansQuery";

interface PaginationData {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface LoanContextState {
  // Filter state
  searchQuery: string;
  statusFilter: string;
  minAmount: string;
  maxAmount: string;

  // Pagination state
  currentPage: number;
  pageSize: number;

  // Data state
  loans: UserLoan[];
  pagination: PaginationData;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
}

interface LoanContextActions {
  // Filter actions
  setSearchQuery: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setMinAmount: (value: string) => void;
  setMaxAmount: (value: string) => void;
  clearFilters: () => void;

  // Pagination actions
  setCurrentPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;

  // Data actions
  refetch: () => void;
}

type LoanContextValue = LoanContextState & LoanContextActions;

const LoanContext = createContext<LoanContextValue | undefined>(undefined);

interface LoanProviderProps {
  children: ReactNode;
}

export const LoanProvider: React.FC<LoanProviderProps> = ({ children }) => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Memoize query parameters to ensure they trigger refetch when changed
  const queryParams = useMemo(
    () => ({
      page: currentPage,
      pageSize,
      q: searchQuery || undefined,
      status: statusFilter === "all" ? "" : statusFilter || undefined,
      minAmount: minAmount ? parseFloat(minAmount) : undefined,
      maxAmount: maxAmount ? parseFloat(maxAmount) : undefined,
    }),
    [currentPage, pageSize, searchQuery, statusFilter, minAmount, maxAmount]
  );

  // Data fetching with the dedicated hook
  const {
    loans,
    pagination: paginationData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useUserLoansQuery(queryParams);

  // Filter actions
  const handleSetSearchQuery = (value: string) => {
    setSearchQuery(value);
    // Reset to first page when searching
    setCurrentPage(1);
  };

  const handleSetStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSetMinAmount = (value: string) => {
    setMinAmount(value);
    setCurrentPage(1);
  };

  const handleSetMaxAmount = (value: string) => {
    setMaxAmount(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setMinAmount("");
    setMaxAmount("");
    setCurrentPage(1);
  };

  // Pagination actions
  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSetPageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    // Reset to first page when changing page size
    setCurrentPage(1);
  };

  const contextValue: LoanContextValue = {
    // State
    searchQuery,
    statusFilter,
    minAmount,
    maxAmount,
    currentPage,
    pageSize,
    loans,
    pagination: paginationData,
    isLoading,
    isFetching,
    error,

    // Actions
    setSearchQuery: handleSetSearchQuery,
    setStatusFilter: handleSetStatusFilter,
    setMinAmount: handleSetMinAmount,
    setMaxAmount: handleSetMaxAmount,
    clearFilters: handleClearFilters,
    setCurrentPage: handleSetCurrentPage,
    setPageSize: handleSetPageSize,
    refetch,
  };

  return (
    <LoanContext.Provider value={contextValue}>{children}</LoanContext.Provider>
  );
};

export { LoanContext };
