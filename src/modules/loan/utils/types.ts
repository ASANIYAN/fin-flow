export interface CreateLoanPayload {
  title: string;
  description: string;
  amountRequested: string;
  interestRate: string;
  duration: string;
  durationUnit: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
}

export interface CreateLoanResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    amountRequested: string;
    interestRate: string;
    duration: string;
    durationUnit: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
    status: string;
    borrowerId: string;
    createdAt: string;
    updatedAt: string;
  };
}
