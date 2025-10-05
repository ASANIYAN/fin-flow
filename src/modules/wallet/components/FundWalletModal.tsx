import React, { useCallback } from "react";
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
import usePaystackScript, {
  CURRENCY,
  PAYSTACK_KEY,
} from "../hooks/usePaystackScript";
import { useUserStore } from "@/store/user-store";

// Paystack global types provided by src/types/paystack.d.ts

const FundWalletModal: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess?: () => void;
}> = ({ open, onOpenChange, onSuccess }) => {
  const isScriptLoaded = usePaystackScript();
  const { user } = useUserStore();
  const { form, submitFund } = useFundWalletMutation();
  const { handleSubmit } = form;

  // watch amount to display formatted value while keeping raw value in form
  const watchedAmount = form.watch("amount");

  const generateReference = () => new Date().getTime().toString();

  const paystackConfig = useCallback(
    () => ({
      reference: generateReference(),
      email: user?.email || "",
      // Amount MUST be in Kobo (lowest denomination)
      amount: parseFloat(watchedAmount || "0") * 100,
      // Paystack expects the public key under the `key` property
      key: PAYSTACK_KEY || "pk_test_f9d0721cdad72e11e42fbf9a057092dd03a0c63c",
      currency: CURRENCY,
      metadata: {
        userId: user?.id || "",
        custom_fields: [
          {
            display_name: "Deposit for",
            variable_name: "p2p_deposit",
            value: "Wallet Funding",
          },
        ],
      },
    }),
    [user?.email, user?.id, watchedAmount]
  );

  const onSubmit = async () => {
    if (!isScriptLoaded || !window.PaystackPop) return;

    // Use a non-async callback (Paystack requires a function). We kick off
    // the async mutation inside without returning a Promise directly to
    // the Paystack callback handler.
    const successCallback = (response: PaystackResponse) => {
      form.setValue("reference", response.reference, { shouldValidate: false });
      void submitFund()
        .then(() => {
          onOpenChange(false);
          if (onSuccess) onSuccess();
        })
        .catch(() => {
          // mutation handles toasts/errors; nothing to do here
        });
    };

    // Paystack close function (called when modal is closed by user)
    const closeCallback = () => {
      form.reset();
    };

    const handler = window.PaystackPop?.setup({
      ...paystackConfig(),
      callback: successCallback,
      onClose: closeCallback,
    });

    if (handler && typeof handler.openIframe === "function") {
      handler.openIframe();
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
