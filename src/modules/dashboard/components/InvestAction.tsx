import React, { useState } from "react";
import type { NewListing } from "@/modules/dashboard/types";
import FundLoanModal from "@/modules/listings/components/FundLoanModal";

const InvestAction: React.FC<{ listing: NewListing }> = ({ listing }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-primary/90 transition-colors text-sm font-medium cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Invest
      </button>

      <FundLoanModal open={open} onOpenChange={setOpen} loanId={listing.id} />
    </>
  );
};

export default InvestAction;
