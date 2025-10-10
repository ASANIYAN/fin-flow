import { useContext } from "react";
import { FundedLoansContext } from "../context/context";
import type { FundedLoansContextType } from "../types";

export const useFundedLoansContext = (): FundedLoansContextType => {
  const context = useContext(FundedLoansContext);
  if (!context) {
    throw new Error(
      "useFundedLoansContext must be used within a FundedLoansProvider"
    );
  }
  return context;
};
