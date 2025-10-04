import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useBanksQuery } from "@/modules/wallet/hooks/useBanksQuery";
import useWithdrawMutation from "@/modules/wallet/hooks/useWithdrawMutation";
import CustomInput from "@/components/common/custom-input";
import ComboboxSelect from "@/components/common/combobox-select";
import { Form } from "@/components/ui/form";
import { formatAmountDisplay } from "@/lib/formatAmount";

const WithdrawModal: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess?: () => void;
}> = ({ open, onOpenChange, onSuccess }) => {
  const { banks } = useBanksQuery();
  const { form, submitWithdraw } = useWithdrawMutation();
  const { handleSubmit } = form;

  const watchedAmount = form.watch("amount");

  const onSubmit = async () => {
    try {
      await submitWithdraw();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch {
      // validation errors surfaced by form
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CustomInput
              name="amount"
              label="Amount"
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
            <ComboboxSelect
              name="bankCode"
              label="Bank"
              placeholder="Select bank"
              control={form.control}
              options={
                banks?.map((b) => ({ value: b.code, label: b.name })) || []
              }
              triggerClassName="rounded h-12 border-border focus:ring-brand-primary"
              contentClassName="max-h-56 max-w-90 sm:max-w-130 md:max-w-120"
            />
            <CustomInput
              name="accountNumber"
              label="Account Number"
              placeholder="Enter account number"
              control={form.control}
              inputClassName="py-3"
              containerClassName="rounded border-gray-200"
            />
            <DialogFooter>
              <button
                type="button"
                className="px-3 py-2 border border-red-600 rounded mr-2 hover:bg-white transition-colors text-red-400"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-brand-primary text-white rounded hover:bg-brand-primary"
              >
                Request
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
