import type { FundedLoan } from "../types";

/**
 * Format currency values for display
 */
export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

/**
 * Format percentage values for display
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

/**
 * Calculate return on investment (ROI)
 */
export const calculateROI = (
  actualEarnings: number,
  investment: number
): number => {
  if (investment === 0) return 0;
  return Math.round((actualEarnings / investment) * 100 * 100) / 100; // Round to 2 decimal places
};

/**
 * Calculate progress percentage for a loan
 */
export const calculateProgress = (
  actualEarnings: number,
  expectedEarnings: number
): number => {
  if (expectedEarnings === 0) return 0;
  return Math.min(100, Math.round((actualEarnings / expectedEarnings) * 100));
};

/**
 * Get status badge color classes
 */
export const getStatusBadgeClasses = (status: string): string => {
  switch (status) {
    case "ACTIVE":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "REPAID":
      return "bg-green-100 text-green-800 border-green-200";
    case "DEFAULTED":
      return "bg-red-100 text-red-800 border-red-200";
    case "OVERDUE":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

/**
 * Format loan duration for display
 */
export const formatDuration = (duration: number, unit: string): string => {
  const formatUnit = (unit: string, count: number) => {
    const lowerUnit = unit.toLowerCase();
    switch (lowerUnit) {
      case "days":
        return count === 1 ? "day" : "days";
      case "weeks":
        return count === 1 ? "week" : "weeks";
      case "months":
        return count === 1 ? "month" : "months";
      case "years":
        return count === 1 ? "year" : "years";
      default:
        return lowerUnit;
    }
  };

  return `${duration} ${formatUnit(unit, duration)}`;
};

/**
 * Sort funded loans by various criteria
 */
export const sortFundedLoans = (
  loans: FundedLoan[],
  sortBy: string
): FundedLoan[] => {
  const [field, direction] = sortBy.split("_");
  const isDesc = direction === "desc";

  return [...loans].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (field) {
      case "createdAt":
      case "fundingDate":
        aValue = new Date(a[field as keyof FundedLoan] as string).getTime();
        bValue = new Date(b[field as keyof FundedLoan] as string).getTime();
        break;
      case "myFundingAmount":
      case "actualEarnings":
      case "expectedEarnings":
      case "interestRate":
        aValue = a[field as keyof FundedLoan] as number;
        bValue = b[field as keyof FundedLoan] as number;
        break;
      case "title":
        aValue = (a[field as keyof FundedLoan] as string).toLowerCase();
        bValue = (b[field as keyof FundedLoan] as string).toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return isDesc ? 1 : -1;
    if (aValue > bValue) return isDesc ? -1 : 1;
    return 0;
  });
};

/**
 * Filter funded loans by search query and status
 */
export const filterFundedLoans = (
  loans: FundedLoan[],
  searchQuery: string,
  statusFilter: string
): FundedLoan[] => {
  return loans.filter((loan) => {
    // Status filter
    if (statusFilter && loan.status !== statusFilter) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const borrowerName =
        `${loan.borrower.firstName} ${loan.borrower.lastName}`.toLowerCase();

      return (
        loan.title.toLowerCase().includes(query) ||
        loan.description.toLowerCase().includes(query) ||
        borrowerName.includes(query)
      );
    }

    return true;
  });
};
