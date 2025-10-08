import React from "react";
import { LoanListingsProvider } from "../context/LoanListingsContext";
import LoanListings from "../components/LoanListings";

const LoanListingsPage: React.FC = () => {
  return (
    <LoanListingsProvider>
      <LoanListings />
    </LoanListingsProvider>
  );
};

export default LoanListingsPage;
