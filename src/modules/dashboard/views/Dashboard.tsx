import React, { useState } from "react";
import { Icon } from "@iconify/react";
import BorrowerDashboard from "../components/BorrowerDashboard";
import LenderDashboard from "../components/LenderDashboard";
import { DashboardSkeleton } from "../components/DashboardSkeleton";
import { useUnifiedDashboardData } from "../hooks/useDashboardApi";
import type { BorrowerDashboardData, LenderDashboardData } from "../types";

const Dashboard: React.FC = () => {
  const { data, isLoading, error, refetch, isRefetching } =
    useUnifiedDashboardData();
  const [activeTab, setActiveTab] = useState<"borrower" | "lender">("borrower");

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
        role="alert"
        aria-live="polite"
      >
        <div className="text-center">
          <Icon
            icon="material-symbols:error-outline"
            className="text-[--color-error] mx-auto mb-2"
            width={48}
            height={48}
            aria-hidden="true"
          />
          <h3
            className="text-lg font-semibold text-text-primary mb-1"
            id="error-heading"
          >
            Failed to load dashboard
          </h3>
          <p className="text-text-secondary" aria-describedby="error-heading">
            There was an error loading your dashboard data.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="flex items-center space-x-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2"
          aria-describedby="error-heading"
          type="button"
        >
          <Icon
            icon="material-symbols:refresh"
            className={isRefetching ? "animate-spin" : ""}
            width={16}
            height={16}
            aria-hidden="true"
          />
          <span>{isRefetching ? "Refreshing..." : "Try Again"}</span>
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="flex items-center justify-center min-h-[400px]"
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <Icon
            icon="material-symbols:inbox-outline"
            className="text-text-secondary mx-auto mb-2"
            width={48}
            height={48}
            aria-hidden="true"
          />
          <p className="text-text-secondary">No dashboard data available</p>
        </div>
      </div>
    );
  }

  return (
    <main className="space-y-6 p-4 md:p-6 max-w-8xl mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-color-text-primary mb-1">
            Dashboard
          </h1>
          <p className="text-color-text-secondary">
            Track your loan applications, funding progress, and investment
            opportunities
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-light-gray hover:bg-border-neutral text-text-primary rounded-lg transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2"
          aria-label={
            isRefetching
              ? "Refreshing dashboard data"
              : "Refresh dashboard data"
          }
          type="button"
        >
          <Icon
            icon="material-symbols:refresh"
            className={isRefetching ? "animate-spin" : ""}
            width={16}
            height={16}
            aria-hidden="true"
          />
          <span>{isRefetching ? "Refreshing..." : "Refresh"}</span>
        </button>
      </header>

      {/* Dashboard Tabs */}
      <section className="flex justify-center">
        <div className="max-w-md w-full">
          <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("borrower")}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 ${
                activeTab === "borrower"
                  ? "bg-white text-brand-primary shadow-sm"
                  : "text-gray-600 hover:text-brand-primary"
              }`}
              type="button"
            >
              <Icon
                icon="material-symbols:person-outline"
                className="inline-block w-4 h-4 mr-2"
                aria-hidden="true"
              />
              Borrower View
            </button>
            <button
              onClick={() => setActiveTab("lender")}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 ${
                activeTab === "lender"
                  ? "bg-white text-brand-primary shadow-sm"
                  : "text-gray-600 hover:text-brand-primary"
              }`}
              type="button"
            >
              <Icon
                icon="material-symbols:account-balance-outline"
                className="inline-block w-4 h-4 mr-2"
                aria-hidden="true"
              />
              Lender View
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section
        className="transition-all duration-300"
        aria-label="Dashboard content"
      >
        {activeTab === "borrower" ? (
          <BorrowerDashboard data={data?.borrower as BorrowerDashboardData} />
        ) : (
          <LenderDashboard data={data?.lender as LenderDashboardData} />
        )}
      </section>
    </main>
  );
};

export default Dashboard;
