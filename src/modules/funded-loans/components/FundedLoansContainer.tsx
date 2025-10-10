import React from "react";
import { FundedLoansProvider } from "../context/FundedLoansContext";
import FundedLoans from "./FundedLoans";

const FundedLoansContainer: React.FC = () => {
  return (
    <FundedLoansProvider>
      <FundedLoans />
    </FundedLoansProvider>
  );
};

export default FundedLoansContainer;
