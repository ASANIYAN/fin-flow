import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import Pagination from "@/components/common/Pagination";
import { useLoansListings } from "../hooks/useLoansListings";
import { loanListingsColumns } from "./LoanListingsColumns";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@iconify/react";

const LoanListings: React.FC = () => {
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-center">
          <Icon
            icon="material-symbols:error-outline"
            className="text-[--color-error] mx-auto mb-2"
            width={48}
            height={48}
          />
          <h3 className="text-lg font-semibold text-[--color-text-primary] mb-1">
            Failed to load loan listings
          </h3>
          <p className="text-[--color-text-secondary]">
            There was an error loading the loan listings.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center space-x-2 px-4 py-2 bg-[--color-brand-primary] text-white rounded-lg hover:bg-[--color-brand-primary]/90 transition-colors"
        >
          <Icon icon="material-symbols:refresh" width={16} height={16} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[--color-text-primary]">
            Loan Listings
          </h1>
          <p className="text-[--color-text-secondary] mt-1">
            Browse and invest in available loan opportunities
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchAndFilter
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        showDownloadButton={true}
        onDownload={handleDownload}
        placeholder="Search by loan title, borrower name, or description..."
      />

      {/* Loans Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[--color-text-primary] flex items-center justify-between">
            <span>Available Loans</span>
            {isFetching && (
              <Icon
                icon="material-symbols:refresh"
                className="animate-spin text-[--color-brand-primary]"
                width={20}
                height={20}
              />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <Icon
                  icon="material-symbols:progress-activity"
                  className="animate-spin text-[--color-brand-primary]"
                  width={24}
                  height={24}
                />
                <span className="text-[--color-text-secondary]">
                  Loading loans...
                </span>
              </div>
            </div>
          ) : loans.length === 0 ? (
            <div className="text-center py-12">
              <Icon
                icon="material-symbols:search-off"
                className="text-gray-400 mx-auto mb-4"
                width={48}
                height={48}
              />
              <h3 className="text-lg font-medium text-[--color-text-primary] mb-1">
                No loans found
              </h3>
              <p className="text-[--color-text-secondary]">
                {searchQuery
                  ? `No loans match your search for "${searchQuery}"`
                  : "There are no loan listings available at the moment"}
              </p>
            </div>
          ) : (
            <>
              <DataTable
                data={loans}
                columns={loanListingsColumns}
                className="w-full"
                pageSize={pageSize}
              />

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-6 border-t pt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    perPage={pageSize}
                    totalItems={pagination.totalItems}
                    onPageChange={handlePageChange}
                    onPerPageChange={handlePageSizeChange}
                    disabled={isFetching}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanListings;
