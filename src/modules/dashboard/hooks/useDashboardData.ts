import { useState, useEffect } from "react";
import type {
  BorrowerDashboardData,
  LenderDashboardData,
  UserRole,
} from "../types";

// Dummy data for borrower dashboard
const mockBorrowerData: BorrowerDashboardData = {
  totalApplications: 4,
  pendingApplications: 1,
  activeLoans: [
    {
      id: "loan-abc",
      title: "Small Business Expansion",
      status: "FUNDING",
      amountRequested: 5000,
      amountFunded: 1000,
      progress: 20,
    },
    {
      id: "loan-def",
      title: "Equipment Purchase",
      status: "FUNDING",
      amountRequested: 3000,
      amountFunded: 1500,
      progress: 50,
    },
    {
      id: "loan-ghi",
      title: "Marketing Campaign",
      status: "FUNDED",
      amountRequested: 4000,
      amountFunded: 3200,
      progress: 80,
    },
    {
      id: "loan-xyz",
      title: "Inventory Purchase",
      status: "FUNDED",
      amountRequested: 2000,
      amountFunded: 2000,
      progress: 100,
    },
  ],
};

// Dummy data for lender dashboard
const mockLenderData: LenderDashboardData = {
  investmentSummary: {
    totalInvested: 15000,
    totalEarnings: 750,
    activeInvestments: 5,
  },
  newListings: [
    {
      id: "loan-def",
      title: "Apartment Renovation",
      borrower: "Jane Doe",
      amountRequested: 7500,
      interestRate: 8.5,
      duration: 12,
      progress: 25,
    },
    {
      id: "loan-mno",
      title: "Medical Equipment",
      borrower: "John Smith",
      amountRequested: 10000,
      interestRate: 7.0,
      duration: 24,
      progress: 10,
    },
  ],
};

export const useDashboardData = (userRole: UserRole) => {
  const [borrowerData, setBorrowerData] =
    useState<BorrowerDashboardData | null>(null);
  const [lenderData, setLenderData] = useState<LenderDashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const fetchData = async () => {
      setLoading(true);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (userRole === "borrower") {
        setBorrowerData(mockBorrowerData);
        setLenderData(null);
      } else {
        setLenderData(mockLenderData);
        setBorrowerData(null);
      }

      setLoading(false);
    };

    fetchData();
  }, [userRole]);

  return {
    borrowerData,
    lenderData,
    loading,
  };
};
