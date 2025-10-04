import { useContext } from "react";
import { LoanContext } from "../context/LoanContext";

export const useLoanContext = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error("useLoanContext must be used within a LoanProvider");
  }
  return context;
};
