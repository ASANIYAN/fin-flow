import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";
import CreateLoan from "./CreateLoan";

const CreateLoanPage: React.FC = () => {
  const { user } = useUserStore();

  // Redirect to dashboard if user is not a borrower
  if (user?.role !== "BORROWER") {
    return <Navigate to="/dashboard" replace />;
  }

  return <CreateLoan />;
};

export default CreateLoanPage;
