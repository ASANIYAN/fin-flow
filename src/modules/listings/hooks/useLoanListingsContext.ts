import { useContext } from "react";
import { LoanListingsContext } from "../context/LoanListingsContext";

export const useLoanListingsContext = () => {
  const context = useContext(LoanListingsContext);
  if (context === undefined) {
    throw new Error(
      "useLoanListingsContext must be used within a LoanListingsProvider"
    );
  }
  return context;
};
