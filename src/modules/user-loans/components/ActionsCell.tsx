import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import type { UserLoan } from "../types";
import UpdateLoanDialog from "./UpdateLoanDialog";

interface ActionsCellProps {
  loan: UserLoan;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ loan }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Only show edit button for PENDING loans
  if (loan.status !== "PENDING") {
    return <div className="w-16"></div>; // Empty space to maintain column width
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditDialogOpen(true);
        }}
        className="h-8 px-3 text-xs hover:bg-brand-primary hover:text-white transition-colors"
        aria-label={`Edit loan ${loan.title}`}
      >
        <Edit2 size={14} className="mr-1" />
        Edit
      </Button>

      <UpdateLoanDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        loan={loan}
      />
    </div>
  );
};

export default ActionsCell;
