import React from "react";
import { LoanProvider } from "../context/LoanContext";
import UserLoans from "./UserLoans";

const UserLoansContainer: React.FC = () => {
  return (
    <LoanProvider>
      <UserLoans />
    </LoanProvider>
  );
};

export default UserLoansContainer;
