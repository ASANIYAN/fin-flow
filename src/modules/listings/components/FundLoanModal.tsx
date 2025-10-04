import React, { useEffect } from "react";
import { X } from "lucide-react";
import { FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/custom-input";
import { formatAmountDisplay } from "@/lib/formatAmount";
import { useFundLoanMutation } from "../hooks/useFundLoanMutation";

type FundLoanModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loanId: string | null;
  onSuccess?: () => void;
};

const FundLoanModal: React.FC<FundLoanModalProps> = ({
  open,
  onOpenChange,
  loanId,
  onSuccess,
}) => {
  const { form, mutation } = useFundLoanMutation();

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const submit = async () => {
    if (!loanId) return;
    await mutation.mutate(loanId);
    onOpenChange(false);
    onSuccess?.();
  };

  // subscribe to amount so formatted display updates while typing
  const watchedAmount = form.watch("amount");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="!max-w-151 rounded-xx py-8"
      >
        <DialogHeader className="flex flex-row items-center justify-between mb-2.5">
          <DialogTitle className="text-lg font-bold">Fund Loan</DialogTitle>
          <DialogClose className="cursor-pointer">
            <X size={20} />
          </DialogClose>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-10">
            <CustomInput
              control={form.control}
              name="amount"
              label="Amount (NGN)"
              placeholder="Enter funding amount"
              containerClassName="bg-white border border-black-1 h-15 rounded-xl"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const raw = String(e.target.value || "").replace(/,/g, "");
                form.setValue("amount", raw, { shouldValidate: true });
              }}
              value={formatAmountDisplay(watchedAmount)}
            />

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 h-13.5 hover:bg-white cursor-pointer"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-13.5 bg-brand-primary hover:bg-brand-primary/80 text-white cursor-pointer"
                type="submit"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Processing..." : "Fund Loan"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default FundLoanModal;
