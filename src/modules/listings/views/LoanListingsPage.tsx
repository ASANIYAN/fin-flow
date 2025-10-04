import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";
import { LoanListingsProvider } from "../context/LoanListingsContext";
import LoanListings from "../components/LoanListings";

const LoanListingsPage: React.FC = () => {
  const { user } = useUserStore();

  // Redirect to dashboard if user is not a lender
  if (user?.role !== "LENDER") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <LoanListingsProvider>
      <LoanListings />
    </LoanListingsProvider>
  );
};

export default LoanListingsPage;
