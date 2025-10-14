import { Dialog, DialogContent } from "@/components/ui/dialog";
import UpdateLoanForm from "./UpdateLoanForm";
import type { UserLoan } from "../types";

interface UpdateLoanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loan: UserLoan;
}

const UpdateLoanDialog: React.FC<UpdateLoanDialogProps> = ({
  open,
  onOpenChange,
  loan,
}) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        showCloseButton={true}
      >
        <div className="mt-4">
          <UpdateLoanForm loan={loan} onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLoanDialog;
