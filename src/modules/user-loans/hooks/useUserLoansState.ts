import { useState, useMemo, useCallback } from "react";
import { useUserLoans } from "./useUserLoans";
import { useDebounce } from "@/hooks/useDebounce";
import type { UserLoan } from "../types";

interface PaginationData {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface UserLoansState {
  // Filter state
  searchQuery: string;
  statusFilter: string;
  minAmount: string;
  maxAmount: string;

  // Data state
  loans: UserLoan[];
  pagination: PaginationData;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  currentPage: number;
  pageSize: number;
}

export interface UserLoansActions {
  // Filter actions
  handleSearchChange: (value: string) => void;
  handleStatusFilterChange: (value: string) => void;
  handleMinAmountChange: (value: string) => void;
  handleMaxAmountChange: (value: string) => void;
  clearFilters: () => void;

  // Data actions
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  refetch: () => void;
  handleDownload: () => void;
}

export const useUserLoansState = () => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce search query to avoid too many API calls
  const debouncedQuery = useDebounce(searchQuery, 300);
  const debouncedStatusFilter = useDebounce(statusFilter, 300);
  const debouncedMinAmount = useDebounce(minAmount, 300);
  const debouncedMaxAmount = useDebounce(maxAmount, 300);

  // Data fetching
  const { loans, pagination, isLoading, isFetching, error, refetch } =
    useUserLoans({
      page: currentPage,
      pageSize,
      q: debouncedQuery,
      status:
        debouncedStatusFilter === "all"
          ? ""
          : debouncedStatusFilter || undefined,
      minAmount: debouncedMinAmount
        ? parseFloat(debouncedMinAmount)
        : undefined,
      maxAmount: debouncedMaxAmount
        ? parseFloat(debouncedMaxAmount)
        : undefined,
    });

  // Filter handlers
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      // Reset to first page when searching
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    },
    [currentPage]
  );

  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);

  const handleMinAmountChange = useCallback((value: string) => {
    setMinAmount(value);
    setCurrentPage(1);
  }, []);

  const handleMaxAmountChange = useCallback((value: string) => {
    setMaxAmount(value);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setStatusFilter("");
    setMinAmount("");
    setMaxAmount("");
    setCurrentPage(1);
  }, []);

  // Data handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    // Reset to first page when changing page size
    setCurrentPage(1);
  }, []);

  const handleDownload = useCallback(() => {
    // Implement download functionality
    console.log("Downloading user loans report...");
  }, []);

  return useMemo(() => {
    const state: UserLoansState = {
      // Filter state
      searchQuery,
      statusFilter,
      minAmount,
      maxAmount,

      // Data state
      loans,
      pagination,
      isLoading,
      isFetching,
      error,
      currentPage,
      pageSize,
    };

    const actions: UserLoansActions = {
      // Filter actions
      handleSearchChange,
      handleStatusFilterChange,
      handleMinAmountChange,
      handleMaxAmountChange,
      clearFilters,

      // Data actions
      handlePageChange,
      handlePageSizeChange,
      refetch,
      handleDownload,
    };

    return {
      ...state,
      ...actions,
    };
  }, [
    searchQuery,
    statusFilter,
    minAmount,
    maxAmount,
    loans,
    pagination,
    isLoading,
    isFetching,
    error,
    currentPage,
    pageSize,
    handleSearchChange,
    handleStatusFilterChange,
    handleMinAmountChange,
    handleMaxAmountChange,
    clearFilters,
    handlePageChange,
    handlePageSizeChange,
    refetch,
    handleDownload,
  ]);
};
