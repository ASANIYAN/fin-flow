import React from "react";
import StatusCard from "../../dashboard/components/StatusCard";
import type { FundedLoansSummary } from "../types";

interface FundedLoansSummaryCardProps {
  summary: FundedLoansSummary;
  isLoading?: boolean;
}

const FundedLoansSummaryCard: React.FC<FundedLoansSummaryCardProps> = ({
  summary,
  isLoading = false,
}) => {
  const summaryItems = [
    {
      title: "Total Investment",
      value: summary.totalFundedAmount,
      icon: "material-symbols:account-balance-outline",
      color: "success" as const,
      symbol: "₦",
    },
    {
      title: "Expected Earnings",
      value: summary.totalExpectedEarnings,
      icon: "material-symbols:trending-up",
      color: "success" as const,
      symbol: "₦",
    },
    {
      title: "Actual Earnings",
      value: summary.totalActualEarnings,
      icon: "material-symbols:payments-outline",
      color: "success" as const,
      symbol: "₦",
    },
    {
      title: "Active Loans",
      value: summary.activeLoansCount,
      icon: "material-symbols:handshake-outline",
      color: "warning" as const,
      symbol: "",
    },
    {
      title: "Repaid Loans",
      value: summary.repaidLoansCount,
      icon: "material-symbols:check-circle-outline",
      color: "success" as const,
      symbol: "",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[...Array(5)].map((_, index) => (
          <StatusCard
            key={index}
            title=""
            value=""
            icon="material-symbols:hourglass-empty"
            className="animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {summaryItems.map((item, index) => (
        <StatusCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
          symbol={item.symbol}
        />
      ))}
    </div>
  );
};

export default FundedLoansSummaryCard;
