export interface ActiveLoan {
  id: string;
  title: string;
  status: "FUNDING" | "FUNDED" | "COMPLETED" | "DEFAULTED" | "PENDING";
  amountRequested: number;
  amountFunded: number;
  progress: number;
}

export interface BorrowerDashboardData {
  totalApplications: number;
  pendingApplications: number;
  activeLoans: ActiveLoan[];
}

export interface InvestmentSummary {
  totalInvested: number;
  totalEarnings: number;
  activeInvestments: number;
}

export interface NewListing {
  id: string;
  title: string;
  borrower: string;
  amountRequested: number;
  interestRate: number;
  duration: number;
  progress: number;
}

export interface LenderDashboardData {
  investmentSummary: InvestmentSummary;
  newListings: NewListing[];
}

export type UserRole = "borrower" | "lender";

export interface DashboardProps {
  userRole?: UserRole;
}
