import React, { useState } from "react";
import type { Loan } from "../types";
import FundLoanModal from "../components/FundLoanModal";

const InvestActionListings: React.FC<{ loan: Loan; disabled?: boolean }> = ({
  loan,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
          !disabled
            ? "bg-brand-primary text-white hover:bg-brand-primary/90"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={disabled}
        onClick={() => !disabled && setOpen(true)}
      >
        {disabled ? "Not Available" : "Invest"}
      </button>

      <FundLoanModal
        open={open}
        onOpenChange={setOpen}
        loanId={loan.id}
        onSuccess={() => console.log("Funding submitted for", loan.id)}
      />
    </>
  );
};

export default InvestActionListings;
