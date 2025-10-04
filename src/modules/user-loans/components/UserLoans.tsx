import React from "react";
import { Icon } from "@iconify/react";
import UserLoansFilters from "./UserLoansFilters";
import UserLoansTable from "./UserLoansTable";
import { useLoanContext } from "../hooks/useLoanContext";

const UserLoans: React.FC = () => {
  const { error, isFetching, refetch } = useLoanContext();

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
            Failed to load your loans
          </h3>
          <p className="text-[--color-text-secondary]">
            There was an error loading your loan data.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center space-x-2 px-4 py-2 bg-[--color-brand-primary] text-white rounded-lg hover:bg-[--color-brand-primary]/90 transition-colors"
        >
          <Icon
            icon="material-symbols:refresh"
            className={isFetching ? "animate-spin" : ""}
            width={16}
            height={16}
          />
          <span>{isFetching ? "Refreshing..." : "Try Again"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[--color-text-primary] mb-1">
            My Loans
          </h1>
          <p className="text-[--color-text-secondary]">
            Track and manage all your loan applications
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-[--color-bg-light-gray] hover:bg-[--color-border-neutral] text-[--color-text-primary] rounded-lg transition-colors disabled:opacity-50"
        >
          <Icon
            icon="material-symbols:refresh"
            className={isFetching ? "animate-spin" : ""}
            width={16}
            height={16}
          />
          <span>{isFetching ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {/* Filters */}
      <UserLoansFilters />

      {/* Loans Table */}
      <UserLoansTable />
    </div>
  );
};

export default UserLoans;
