export interface Borrower {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "BORROWER";
  isEmailVerified: boolean;
  createdAt: string;
}

export interface Loan {
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
  borrowerId: string;
  borrower: Borrower;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface LoansListResponse {
  success: boolean;
  message: string;
  data: {
    loans: Loan[];
    pagination: Pagination;
  };
}

export interface LoansQueryParams {
  page?: number;
  pageSize?: number;
  query?: string;
}
