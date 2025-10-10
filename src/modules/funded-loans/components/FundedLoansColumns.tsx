import type { ColumnDef } from "@tanstack/react-table";
import type { FundedLoan } from "../types";

const getStatusBadgeClasses = (status: string) => {
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

export const fundedLoansColumns: ColumnDef<FundedLoan>[] = [
  {
    accessorKey: "title",
    header: () => (
      <span className="text-text-secondary font-medium text-sm">
        Loan Title
      </span>
    ),
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="font-medium text-text-primary text-sm">
          {row.original.title}
        </div>
        <div className="text-xs text-text-secondary hidden md:block">
          {row.original.description.length > 50
            ? `${row.original.description.substring(0, 50)}...`
            : row.original.description}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "borrower",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden md:block">
        Borrower
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block">
        <div className="text-text-primary text-sm">
          {row.original.borrower.firstName} {row.original.borrower.lastName}
        </div>
        {row.original.borrower.isEmailVerified && (
          <div className="text-xs text-green-600">✓ Verified</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "myFundingAmount",
    header: () => (
      <span className="text-text-secondary font-medium text-sm">
        My Investment
      </span>
    ),
    cell: ({ row }) => (
      <div className="text-text-primary font-medium">
        ₦{row.original.myFundingAmount.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "interestRate",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden lg:block">
        Interest Rate
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:block text-text-primary">
        {row.original.interestRate}%
      </div>
    ),
  },
  {
    accessorKey: "expectedEarnings",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden md:block">
        Expected Earnings
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block text-green-600 font-medium">
        ₦{row.original.expectedEarnings.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "actualEarnings",
    header: () => (
      <span className="text-text-secondary font-medium text-sm">
        Actual Earnings
      </span>
    ),
    cell: ({ row }) => (
      <div className="text-green-600 font-medium">
        ₦{row.original.actualEarnings.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-text-secondary font-medium text-sm">Status</span>
    ),
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClasses(
          row.original.status
        )}`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "fundingDate",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden lg:block">
        Funding Date
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:block text-text-secondary text-sm">
        {new Date(row.original.fundingDate).toLocaleDateString()}
      </div>
    ),
  },
];
