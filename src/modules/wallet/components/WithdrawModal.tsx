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
import useResolveAccount from "@/modules/wallet/hooks/useResolveAccount";
import CustomInput from "@/components/common/custom-input";
import ComboboxSelect from "@/components/common/combobox-select";
import { Form } from "@/components/ui/form";
import { formatAmountDisplay } from "@/lib/formatAmount";
import { useDebounce } from "@/hooks/useDebounce";

const WithdrawModal: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess?: () => void;
}> = ({ open, onOpenChange, onSuccess }) => {
  const { banks } = useBanksQuery();
  const { form, submitWithdraw } = useWithdrawMutation();
  const { handleSubmit } = form;

  const watchedAmount = form.watch("amount");
  const [resolvedAccountName, setResolvedAccountName] =
    React.useState<string>("");

  const resolveAccountMutation = useResolveAccount();

  const accountNumberValue = form.watch("accountNumber");
  const bankCodeValue = form.watch("bankCode");
  const debouncedAccountNumber = useDebounce(accountNumberValue, 500);
  const debouncedBankCode = useDebounce(bankCodeValue, 500);

  const isResolvingRef = React.useRef(false);

  React.useEffect(() => {
    // Resolve when debounced values change. Prevent multiple concurrent requests.
    if (!debouncedAccountNumber || !debouncedBankCode || isResolvingRef.current)
      return;

    isResolvingRef.current = true;
    let mounted = true;

    (async () => {
      try {
        const res = await resolveAccountMutation.mutateAsync({
          accountNumber: debouncedAccountNumber,
          bankCode: debouncedBankCode,
        });
        if (!mounted) return;
        const name = res?.data?.account_name || "";
        setResolvedAccountName(name);
      } catch {
        if (!mounted) return;
        setResolvedAccountName("");
      } finally {
        if (mounted) isResolvingRef.current = false;
      }
    })();

    return () => {
      mounted = false;
      isResolvingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAccountNumber]);

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

            <CustomInput
              name="accountName"
              label="Account Name"
              placeholder="Account name"
              control={form.control}
              inputClassName="py-3"
              disabled
              containerClassName="rounded border-gray-200 bg-gray-50"
              value={resolvedAccountName}
              readOnly
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
