import React, { createContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { UserLoan } from "../types";

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

  // Data fetching with direct query
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["user-loans", queryParams],
    queryFn: async (): Promise<{
      loans: UserLoan[];
      page: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    }> => {
      try {

        const searchParams = new URLSearchParams({
          page: queryParams.page.toString(),
          pageSize: queryParams.pageSize.toString(),
        });

        if (queryParams.q?.trim()) {
          searchParams.append("q", queryParams.q.trim());
        }

        if (queryParams.minAmount !== undefined) {
          searchParams.append("minAmount", queryParams.minAmount.toString());
        }

        if (queryParams.maxAmount !== undefined) {
          searchParams.append("maxAmount", queryParams.maxAmount.toString());
        }

        if (queryParams.status) {
          searchParams.append("status", queryParams.status);
        }

        const response = await authApi.get(
          `/api/loans/my-loans?${searchParams.toString()}`
        );

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to fetch user loans"
          );
        }

        console.log("API Response:", response.data);
        return response.data.data;
      } catch (error) {
        const errorMsg = getApiErrorMessage(error);
        toast.error(errorMsg || "Failed to fetch your loans");
        throw error;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    enabled: true,
  });

  // Extract data from response
  const loans = data?.loans || [];
  const paginationData: PaginationData = {
    page: data?.page || currentPage,
    pageSize: data?.pageSize || pageSize,
    totalItems: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
  };

  // Filter actions
  const handleSetSearchQuery = (value: string) => {
    console.log("Search changed:", value);
    setSearchQuery(value);
    // Reset to first page when searching
    setCurrentPage(1);
  };

  const handleSetStatusFilter = (value: string) => {
    console.log("Status filter changed:", value);
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSetMinAmount = (value: string) => {
    console.log("Min amount changed:", value);
    setMinAmount(value);
    setCurrentPage(1);
  };

  const handleSetMaxAmount = (value: string) => {
    console.log("Max amount changed:", value);
    setMaxAmount(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    console.log("Clearing filters");
    setSearchQuery("");
    setStatusFilter("");
    setMinAmount("");
    setMaxAmount("");
    setCurrentPage(1);
  };

  // Pagination actions
  const handleSetCurrentPage = (page: number) => {
    console.log("Page changed:", page);
    setCurrentPage(page);
  };

  const handleSetPageSize = (newPageSize: number) => {
    console.log("Page size changed:", newPageSize);
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
