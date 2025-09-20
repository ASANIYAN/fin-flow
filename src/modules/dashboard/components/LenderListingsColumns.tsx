import type { ColumnDef } from "@tanstack/react-table";
import type { NewListing } from "../types";

export const lenderListingsColumns: ColumnDef<NewListing>[] = [
  {
    accessorKey: "title",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm">
        Loan Title
      </span>
    ),
    cell: ({ row }) => {
      const listing = row.original;
      return (
        <div className="space-y-1">
          <div
            className="font-medium text-[--color-text-primary] hover:text-[--color-brand-primary] transition-colors cursor-pointer"
            onClick={() => console.log("Navigate to loan details:", listing.id)}
          >
            {listing.title}
          </div>
          {/* Mobile view additional info */}
          <div className="md:hidden flex flex-wrap gap-2 text-sm text-[--color-text-secondary]">
            <span>By {listing.borrower}</span>
            <span>•</span>
            <span>₦{listing.amountRequested.toLocaleString()}</span>
            <span>•</span>
            <span>{listing.interestRate}% APR</span>
            <span>•</span>
            <span>{listing.duration} months</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "borrower",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm hidden md:block">
        Borrower
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block text-[--color-text-primary] font-medium">
        {row.original.borrower}
      </div>
    ),
  },
  {
    accessorKey: "amountRequested",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm hidden md:block">
        Amount
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block text-[--color-text-primary] font-medium">
        ₦{row.original.amountRequested.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "interestRate",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm hidden md:block">
        Interest Rate
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[--color-success]/10 text-[--color-success]">
          {row.original.interestRate}% APR
        </span>
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm hidden md:block">
        Term
      </span>
    ),
    cell: ({ row }) => (
      <div className="hidden md:block text-[--color-text-primary]">
        {row.original.duration} months
      </div>
    ),
  },
  {
    id: "actions",
    header: () => (
      <span className="text-[--color-text-secondary] font-medium text-sm">
        Action
      </span>
    ),
    cell: ({ row }) => (
      <button
        className="bg-[--color-brand-primary] text-white px-4 py-2 rounded-lg hover:bg-[--color-brand-primary]/90 transition-colors text-sm font-medium"
        onClick={() => {
          // Handle invest click - you can replace this with your actual logic
          console.log("Invest in loan:", row.original.title);
        }}
      >
        Invest
      </button>
    ),
  },
];
