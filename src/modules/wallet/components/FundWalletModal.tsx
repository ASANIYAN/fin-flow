import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useFundWalletMutation from "@/modules/wallet/hooks/useFundWalletMutation";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/custom-input";
import { Form } from "@/components/ui/form";
import { formatAmountDisplay } from "@/lib/formatAmount";

const FundWalletModal: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess?: () => void;
}> = ({ open, onOpenChange, onSuccess }) => {
  const { form, submitFund } = useFundWalletMutation();
  const { handleSubmit } = form;

  // watch amount to display formatted value while keeping raw value in form
  const watchedAmount = form.watch("amount");

  const onSubmit = async () => {
    try {
      await submitFund();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch {
      // zod/react-hook-form will surface validation errors; mutation errors handled in hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fund Wallet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CustomInput
              name="amount"
              label=""
              placeholder="Enter amount"
              control={form.control}
              inputClassName="py-3"
              containerClassName="rounded border-gray-200"
              value={formatAmountDisplay(watchedAmount)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const raw = String(e.target.value || "").replace(/,/g, "");
                form.setValue("amount", raw, { shouldValidate: true });
              }}
            />
            <DialogFooter>
              <Button
                type="button"
                className="px-3 py-2 border border-red-600 rounded mr-2 bg-white hover:bg-white transition-colors text-red-400 cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-3 py-2 bg-brand-primary text-white rounded cursor-pointer hover:bg-brand-primary"
              >
                Fund
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FundWalletModal;
