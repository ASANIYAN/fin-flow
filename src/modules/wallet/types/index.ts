export interface LoanRef {
  title?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: "DEPOSIT" | "WITHDRAWAL" | string;
  description?: string | null;
  externalRef?: string | null;
  loanId?: string | null;
  loan?: LoanRef | null;
  createdAt: string;
}

export interface TransactionsListResponse {
  success: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface Bank {
  name: string;
  code: string;
}

export interface BanksListResponse {
  success: boolean;
  message: string;
  data: Bank[];
}
