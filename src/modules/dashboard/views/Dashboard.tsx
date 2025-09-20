import React, { useState } from "react";
import { Icon } from "@iconify/react";
import BorrowerDashboard from "../components/BorrowerDashboard";
import LenderDashboard from "../components/LenderDashboard";
import { useDashboardData } from "../hooks/useDashboardData";
import type { UserRole } from "../types";

const Dashboard: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>("borrower");
  const { borrowerData, lenderData, loading } = useDashboardData(userRole);

  const handleRoleToggle = (role: UserRole) => {
    setUserRole(role);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2 text-secondary">
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

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-8xl mx-auto">
      {/* Header with Role Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black mb-1">Dashboard</h1>
          <p className="text-black">
            {userRole === "borrower"
              ? "Track your loan applications and funding progress"
              : "Discover investment opportunities and monitor your portfolio"}
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="transition-all duration-300">
        {userRole === "borrower" && borrowerData && (
          <BorrowerDashboard data={borrowerData} />
        )}

        {userRole === "lender" && lenderData && (
          <LenderDashboard data={lenderData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
