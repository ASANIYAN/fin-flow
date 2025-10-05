import type { ColumnDef } from "@tanstack/react-table";
import type { Loan } from "../types";
import InvestActionListings from "./InvestActionListings";

export const loanListingsColumns: ColumnDef<Loan>[] = [
  {
    accessorKey: "title",
    header: () => (
      <span className="text-text-secondary font-medium text-sm">
        Loan Title
      </span>
    ),
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <div className="space-y-1">
          <div className="font-medium text-black hover:text-black/80 transition-colors cursor-pointer">
            {loan.title}
          </div>
          {/* Mobile view additional info */}
          <div className="md:hidden flex flex-wrap gap-2 text-sm text-text-secondary">
            <span>
              By {loan.borrower.firstName} {loan.borrower.lastName}
            </span>
            <span>•</span>
            <span>₦{loan.amountRequested.toLocaleString()}</span>
            <span>•</span>
            <span>{loan.interestRate}% </span>
            <span>•</span>
            <span>Interest: ₦{(loan.totalInterest ?? 0).toLocaleString()}</span>
            <span>•</span>
            <span>
              {loan.duration} {loan.durationUnit?.toLowerCase() || ""}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "borrower",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden md:block">
        Borrower
      </span>
    ),
    cell: ({ row }) => (
      <div className="text-black font-medium hidden md:block">
        {row.original.borrower.firstName} {row.original.borrower.lastName}
      </div>
    ),
  },
  {
    accessorKey: "amountRequested",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden md:block">
        Amount Requested
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block text-black font-medium">
        ₦{row.original.amountRequested.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "amountFunded",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden md:block">
        Amount Funded
      </span>
    ),
    cell: ({ row }) => {
      const { amountFunded, amountRequested } = row.original;
      const progress = Math.round((amountFunded / amountRequested) * 100);

      return (
        <div className="hidden md:block space-y-1">
          <div className="text-black font-medium">
            ₦{amountFunded.toLocaleString()}
          </div>
          <div className="text-xs text-text-secondary">{progress}% funded</div>
        </div>
      );
    },
  },
  {
    accessorKey: "interestRate",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden md:block">
        Interest Rate
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
          {row.original.interestRate}%
        </span>
      </div>
    ),
  },
  {
    accessorKey: "totalInterest",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden lg:block">
        Total Interest
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:block text-black font-medium">
        ₦{(row.original.totalInterest ?? 0).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden md:block">
        Term
      </span>
    ),
    cell: ({ row }) => {
      const { duration, durationUnit } = row.original;
      const formatDurationUnit = (unit: string | undefined) => {
        const safeUnit = unit || "MONTHS";
        switch (safeUnit) {
          case "DAYS":
            return duration === 1 ? "day" : "days";
          case "WEEKS":
            return duration === 1 ? "week" : "weeks";
          case "MONTHS":
            return duration === 1 ? "month" : "months";
          case "YEARS":
            return duration === 1 ? "year" : "years";
          default:
            return "months";
        }
      };

      return (
        <div className="text-black">
          {duration} {formatDurationUnit(durationUnit)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-text-secondary font-medium text-sm hidden md:block">
        Status
      </span>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const getStatusColor = () => {
        switch (status) {
          case "PENDING":
            return "bg-warning/10 text-warning";
          case "FUNDING":
            return "bg-brand-primary/10 text-brand-primary";
          case "FUNDED":
            return "bg-success/10 text-success";
          case "REPAID":
            return "bg-green-100 text-green-800";
          case "DEFAULTED":
            return "bg-error/10 text-error";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      return (
        <div className="hidden md:block">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <span className="text-text-secondary font-medium text-sm">Action</span>
    ),
    cell: ({ row }) => {
      const loan = row.original;
      const isInvestable =
        loan.status === "FUNDING" || loan.status === "PENDING";
      return <InvestActionListings loan={loan} disabled={!isInvestable} />;
    },
  },
];
