import { createContext } from "react";
import type { FundedLoansContextType } from "../types";

export const FundedLoansContext = createContext<
  FundedLoansContextType | undefined
>(undefined);
