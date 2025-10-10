export interface FundedLoanBorrower {
  id: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
}

export interface FundedLoan {
  id: string;
  title: string;
  description: string;
  amountRequested: number;
  amountFunded: number;
  myFundingAmount: number;
  interestRate: number;
  duration: number;
  durationUnit: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
  totalInterest: number;
  expectedEarnings: number;
  actualEarnings: number;
  principalRepaid: number;
  status: "ACTIVE" | "REPAID" | "DEFAULTED" | "OVERDUE";
  borrower: FundedLoanBorrower;
  fundingDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface FundedLoansPagination {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface FundedLoansSummary {
  totalFundedAmount: number;
  totalExpectedEarnings: number;
  totalActualEarnings: number;
  activeLoansCount: number;
  repaidLoansCount: number;
}

export interface FundedLoansApiResponse {
  success: boolean;
  message: string;
  data: {
    loans: FundedLoan[];
    pagination: FundedLoansPagination;
    summary: FundedLoansSummary;
  };
}

export interface FundedLoansQueryParams {
  page?: number;
  pageSize?: number;
  status?: string;
  sortBy?: string;
  search?: string;
}

export interface FundedLoansContextType {
  loans: FundedLoan[];
  pagination: FundedLoansPagination;
  summary: FundedLoansSummary;
  searchQuery: string;
  statusFilter: string;
  sortBy: string;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  setSortBy: (sort: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  refetch: () => void;
}
