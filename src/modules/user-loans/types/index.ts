export interface UserLoan {
  id: string;
  title: string;
  description: string;
  amountRequested: number;
  amountFunded: number;
  interestRate: number;
  duration: number;
  durationUnit?: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
  totalInterest: number;
  status: "PENDING" | "FUNDING" | "FUNDED" | "REPAID" | "DEFAULTED";
  createdAt: string;
  updatedAt: string;
}

export interface UserLoansResponse {
  success: boolean;
  message: string;
  data: {
    loans: UserLoan[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface UserLoansQueryParams {
  page?: number;
  pageSize?: number;
  q?: string;
  minAmount?: number;
  maxAmount?: number;
  status?: string;
}

// Update loan types
export interface UpdateLoanPayload {
  title: string;
  description: string;
  amountRequested: number;
  interestRate: number;
  duration: number;
  durationUnit: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
}

export interface UpdateLoanData {
  id: string;
  title: string;
  description: string;
  amountRequested: number;
  amountFunded: number;
  interestRate: number;
  duration: number;
  durationUnit: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
  totalInterest: number;
  status: "PENDING" | "FUNDING" | "FUNDED" | "REPAID" | "DEFAULTED";
  borrower: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateLoanResponse {
  success: boolean;
  message: string;
  data: UpdateLoanData;
}
