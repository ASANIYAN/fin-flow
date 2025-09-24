import React from "react";
import { Icon } from "@iconify/react";
import BorrowerDashboard from "../components/BorrowerDashboard";
import LenderDashboard from "../components/LenderDashboard";
import { useDashboardData } from "../hooks/useDashboardApi";
import { useUserStore } from "@/store/user-store";
import type { BorrowerDashboardData, LenderDashboardData } from "../types";

const Dashboard: React.FC = () => {
  const { user } = useUserStore();

  // Get user role from the store, fallback to BORROWER if not available
  const userRole = user?.role || "BORROWER";

  const { data, isLoading, error, refetch, isRefetching } =
    useDashboardData(userRole);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2 text-[--color-text-secondary]">
          <Icon
            icon="material-symbols:refresh"
            className="animate-spin"
            width={20}
            height={20}
          />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

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
            Failed to load dashboard
          </h3>
          <p className="text-[--color-text-secondary]">
            There was an error loading your dashboard data.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="flex items-center space-x-2 px-4 py-2 bg-[--color-brand-primary] text-white rounded-lg hover:bg-[--color-brand-primary]/90 transition-colors disabled:opacity-50"
        >
          <Icon
            icon="material-symbols:refresh"
            className={isRefetching ? "animate-spin" : ""}
            width={16}
            height={16}
          />
          <span>{isRefetching ? "Refreshing..." : "Try Again"}</span>
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Icon
            icon="material-symbols:inbox-outline"
            className="text-[--color-text-secondary] mx-auto mb-2"
            width={48}
            height={48}
          />
          <p className="text-[--color-text-secondary]">
            No dashboard data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[--color-text-primary] mb-1">
            Dashboard
          </h1>
          <p className="text-[--color-text-secondary]">
            {userRole === "BORROWER"
              ? "Track your loan applications and funding progress"
              : "Discover investment opportunities and monitor your portfolio"}
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-[--color-bg-light-gray] hover:bg-[--color-border-neutral] text-[--color-text-primary] rounded-lg transition-colors disabled:opacity-50"
        >
          <Icon
            icon="material-symbols:refresh"
            className={isRefetching ? "animate-spin" : ""}
            width={16}
            height={16}
          />
          <span>{isRefetching ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="transition-all duration-300">
        {userRole === "BORROWER" && (
          <BorrowerDashboard data={data as BorrowerDashboardData} />
        )}
        {userRole === "LENDER" && (
          <LenderDashboard data={data as LenderDashboardData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
