import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";
import LoanListings from "../components/LoanListings";

const LoanListingsPage: React.FC = () => {
  const { user } = useUserStore();

  // Redirect to dashboard if user is not a lender
  if (user?.role !== "LENDER") {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoanListings />;
};

export default LoanListingsPage;
