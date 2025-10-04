import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import Pagination from "@/components/common/Pagination";
import { userLoansColumns } from "./UserLoansColumns";
import { Icon } from "@iconify/react";
import { useLoanContext } from "../hooks/useLoanContext";

const UserLoansTable: React.FC = () => {
  const {
    loans,
    pagination,
    isLoading,
    isFetching,
    error,
    setCurrentPage,
    setPageSize,
  } = useLoanContext();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg">
            Your Loans ({pagination.totalItems})
          </CardTitle>
          <button
            onClick={() => console.log("Download functionality")}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-[--color-brand-primary] text-white rounded-lg hover:bg-[--color-brand-primary]/90 transition-colors"
          >
            <Icon icon="material-symbols:download" width={16} height={16} />
            <span>Download Report</span>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && loans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon
              icon="material-symbols:progress-activity"
              className="animate-spin text-[--color-brand-primary] mb-4"
              width={24}
              height={24}
            />
            <span className="text-[--color-text-secondary]">
              Loading your loans...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Icon
              icon="material-symbols:error-outline"
              className="text-red-400 mx-auto mb-4"
              width={48}
              height={48}
            />
            <h3 className="text-lg font-medium text-[--color-text-primary] mb-1">
              Failed to load loans
            </h3>
            <p className="text-[--color-text-secondary]">
              {error.message || "An error occurred while loading your loans"}
            </p>
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
              You haven't applied for any loans yet
            </p>
          </div>
        ) : (
          <>
            {isFetching && (
              <div className="flex items-center justify-center py-2 mb-4">
                <Icon
                  icon="material-symbols:refresh"
                  className="animate-spin text-[--color-brand-primary] mr-2"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-[--color-text-secondary]">
                  Updating...
                </span>
              </div>
            )}
            <DataTable
              columns={userLoansColumns}
              data={loans}
              className="min-w-300"
            />

            {pagination.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  perPage={pagination.pageSize}
                  totalItems={pagination.totalItems}
                  onPageChange={setCurrentPage}
                  onPerPageChange={setPageSize}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserLoansTable;
