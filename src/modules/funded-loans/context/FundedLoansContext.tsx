import React, { useState } from "react";
import { useFundedLoansQuery } from "../hooks/useFundedLoansQuery";
import type { FundedLoansContextType } from "../types";
import { useDebounce } from "@/hooks/useDebounce";
import { FundedLoansContext } from "./context";

interface FundedLoansProviderProps {
  children: React.ReactNode;
}

export const FundedLoansProvider: React.FC<FundedLoansProviderProps> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt_desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { loans, pagination, summary, isLoading, isFetching, error, refetch } =
    useFundedLoansQuery({
      page: currentPage,
      pageSize,
      status: statusFilter,
      sortBy,
      search: debouncedSearchQuery,
    });

  // Reset to first page when filters change
  const setSearchQueryWithReset = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const setStatusFilterWithReset = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const setSortByWithReset = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const setPageSizeWithReset = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const contextValue: FundedLoansContextType = {
    loans,
    pagination,
    summary,
    searchQuery,
    statusFilter,
    sortBy,
    isLoading,
    isFetching,
    error,
    setSearchQuery: setSearchQueryWithReset,
    setStatusFilter: setStatusFilterWithReset,
    setSortBy: setSortByWithReset,
    setCurrentPage,
    setPageSize: setPageSizeWithReset,
    refetch,
  };

  return (
    <FundedLoansContext.Provider value={contextValue}>
      {children}
    </FundedLoansContext.Provider>
  );
};
