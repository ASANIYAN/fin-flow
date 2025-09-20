import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { borrowerLoansColumns } from "./BorrowerLoansColumns";
import StatusCard from "./StatusCard";
import type { BorrowerDashboardData } from "../types";

interface BorrowerDashboardProps {
  data: BorrowerDashboardData;
}

const BorrowerDashboard: React.FC<BorrowerDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <StatusCard
          title="Total Applications"
          value={data.totalApplications}
          icon="material-symbols:description-outline"
          color="primary"
          description="All time applications"
        />

        <StatusCard
          title="Pending Applications"
          value={data.pendingApplications}
          icon="material-symbols:pending-outline"
          color="warning"
          description="Awaiting review"
        />

        <StatusCard
          title="Active Loans"
          value={data.activeLoans.length}
          icon="material-symbols:handshake-outline"
          color="success"
          description="Currently funded"
        />

        <StatusCard
          title="Total Funded"
          value={data.activeLoans.reduce(
            (sum, loan) => sum + loan.amountFunded,
            0
          )}
          icon="material-symbols:payments-outline"
          color="success"
          description="Amount received"
        />
      </div>

      {/* Active Loans Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[--color-text-primary]">
            Active Loans
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.activeLoans.length === 0 ? (
            <div className="text-center py-8 text-[--color-text-secondary]">
              <p>No active loans found</p>
            </div>
          ) : (
            <DataTable
              data={data.activeLoans}
              columns={borrowerLoansColumns}
              className="w-full max-xl:min-w-250"
              pageSize={10}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowerDashboard;
