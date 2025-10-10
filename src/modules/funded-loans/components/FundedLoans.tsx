import React from "react";
import { Icon } from "@iconify/react";
import FundedLoansFilters from "./FundedLoansFilters";
import FundedLoansTable from "./FundedLoansTable";
import FundedLoansSummaryCard from "./FundedLoansSummaryCard";
import { useFundedLoansContext } from "../hooks/useFundedLoansContext";

const FundedLoans: React.FC = () => {
  const { summary, isLoading, error, refetch, isFetching } =
    useFundedLoansContext();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
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
        <button
          onClick={() => refetch()}
          className="flex items-center space-x-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          aria-label="Retry loading funded loans"
        >
          <Icon
            icon="material-symbols:refresh"
            className={isFetching ? "animate-spin" : ""}
            width={16}
            height={16}
            aria-hidden="true"
          />
          <span>{isFetching ? "Retrying..." : "Try Again"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary mb-1">
            Funded Loans
          </h1>
          <p className="text-text-secondary">
            Track and manage your loan investments and earnings
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-light-gray hover:bg-border-neutral text-text-primary rounded-lg transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          aria-label={
            isFetching
              ? "Refreshing funded loans data"
              : "Refresh funded loans data"
          }
          type="button"
        >
          <Icon
            icon="material-symbols:refresh"
            className={isFetching ? "animate-spin" : ""}
            width={16}
            height={16}
            aria-hidden="true"
          />
          <span>{isFetching ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {/* Summary Cards */}
      <FundedLoansSummaryCard summary={summary} isLoading={isLoading} />

      {/* Filters */}
      <FundedLoansFilters />

      {/* Funded Loans Table */}
      <FundedLoansTable />
    </div>
  );
};

export default FundedLoans;
