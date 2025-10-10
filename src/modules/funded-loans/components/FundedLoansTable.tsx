import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import Pagination from "@/components/common/Pagination";
import { fundedLoansColumns } from "./FundedLoansColumns";
import { Icon } from "@iconify/react";
import { useFundedLoansContext } from "../hooks/useFundedLoansContext";

const FundedLoansTable: React.FC = () => {
  const {
    loans,
    pagination,
    isLoading,
    isFetching,
    error,
    setCurrentPage,
    setPageSize,
  } = useFundedLoansContext();

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="text-center">
            <Icon
              icon="material-symbols:error-outline"
              className="text-red-500 mx-auto mb-2"
              width={48}
              height={48}
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              Failed to load funded loans
            </h3>
            <p className="text-text-secondary">
              There was an error loading your funded loans data.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-text-primary">
              Funded Loans
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-text-primary">
            Funded Loans ({pagination.totalCount})
          </CardTitle>
          {isFetching && (
            <Icon
              icon="material-symbols:refresh"
              className="animate-spin text-brand-primary"
              width={20}
              height={20}
              aria-hidden="true"
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!loans || loans.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon
              icon="material-symbols:inbox-outline"
              className="mx-auto mb-4 text-gray-400"
              width={64}
              height={64}
              aria-hidden="true"
            />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No funded loans found
            </h3>
            <p className="text-text-secondary">
              You haven't funded any loans yet or none match your current
              filters.
            </p>
          </div>
        ) : (
          <>
            {/* Loading overlay when fetching */}
            {isFetching && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                <Icon
                  icon="material-symbols:refresh"
                  className="animate-spin text-brand-primary"
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </div>
            )}

            <DataTable
              columns={fundedLoansColumns}
              data={loans}
              className="min-w-300"
            />

            {pagination.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  perPage={pagination.pageSize}
                  totalItems={pagination.totalCount}
                  onPageChange={setCurrentPage}
                  onPerPageChange={setPageSize}
                  disabled={isFetching}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FundedLoansTable;
