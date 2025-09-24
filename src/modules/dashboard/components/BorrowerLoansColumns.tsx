import { DashboardProgress } from "./DashboardProgress";
import type { ColumnDef } from "@tanstack/react-table";
import type { ActiveLoan } from "../types";

const getStatusBadgeClasses = (status: string) => {
  switch (status) {
    case "FUNDED":
      return "bg-[--color-success]/10 text-[--color-success]";
    case "FUNDING":
      return "bg-[--color-warning]/10 text-[--color-warning]";
    case "COMPLETED":
      return "bg-[--color-success]/10 text-[--color-success]";
    case "DEFAULTED":
      return "bg-[--color-error]/10 text-[--color-error]";
    case "PENDING":
      return "bg-[--color-border-neutral]/10 text-[--color-text-secondary]";
    default:
      return "bg-[--color-brand-primary]/10 text-[--color-brand-primary]";
  }
};

export const borrowerLoansColumns: ColumnDef<ActiveLoan>[] = [
  {
    accessorKey: "title",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm">
        Loan Title
      </span>
    ),
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <div className="space-y-1">
          <div className="font-medium text-[--color-text-primary]">
            {loan.title}
          </div>
          {/* Mobile view additional info */}
          <div className="md:hidden flex flex-wrap gap-2 text-sm text-[--color-text-secondary]">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(
                loan.status
              )}`}
            >
              {loan.status}
            </span>
            <span>
              ₦{loan.amountFunded.toLocaleString()} / ₦
              {loan.amountRequested.toLocaleString()}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm hidden md:block">
        Status
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(
            row.original.status
          )}`}
        >
          {row.original.status}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "amountRequested",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm hidden md:block">
        Requested
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block text-[--color-text-primary]">
        ₦{row.original.amountRequested.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "amountFunded",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm hidden md:block">
        Funded
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block text-[--color-text-primary]">
        ₦{row.original.amountFunded.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "progress",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm">
        Progress
      </span>
    ),
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <div className="space-y-2 min-w-32">
          <div className="flex justify-between text-sm">
            <span className="text-[--color-text-secondary]">Progress</span>
            <span className="font-medium text-[--color-text-primary]">
              {loan.progress}%
            </span>
          </div>
          <DashboardProgress value={loan.progress} className="h-2 w-full" />
        </div>
      );
    },
  },
];
