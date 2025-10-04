import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { lenderListingsColumns } from "./LenderListingsColumns";
import StatusCard from "./StatusCard";
import type { LenderDashboardData } from "../types";

interface LenderDashboardProps {
  data: LenderDashboardData;
}

const LenderDashboard: React.FC<LenderDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Investment Summary Cards */}
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        <StatusCard
          title="Total Invested"
          value={data.investmentSummary.totalInvested}
          icon="material-symbols:account-balance-outline"
          color="success"
          description="Your total investment"
        />

        <StatusCard
          title="Total Earnings"
          value={data.investmentSummary.totalEarnings}
          icon="material-symbols:trending-up"
          color="success"
          description="Returns generated"
        />

        <StatusCard
          title="Active Investments"
          value={data.investmentSummary.activeInvestments}
          icon="material-symbols:account-balance-outline"
          color="warning"
          description="Currently funding"
        />
      </div>

      {/* New Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-text-primary">
            New Loan Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.newListings.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              <p>No new loan opportunities available</p>
            </div>
          ) : (
            <DataTable
              data={data.newListings}
              columns={lenderListingsColumns}
              className="w-full min-w-250 mb-5"
              pageSize={10}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LenderDashboard;
