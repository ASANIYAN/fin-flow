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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Total Invested"
          value={data.investmentSummary.totalInvested}
          icon="material-symbols:investment-outline"
          color="primary"
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

        <StatusCard
          title="Return Rate"
          value={`${(
            (data.investmentSummary.totalEarnings /
              data.investmentSummary.totalInvested) *
            100
          ).toFixed(1)}%`}
          icon="material-symbols:percent"
          color="success"
          description="Average return rate"
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
              className="w-full"
              pageSize={10}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LenderDashboard;
