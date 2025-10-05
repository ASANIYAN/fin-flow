import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/services/auth-services/axiosInstance";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

const FundSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^[0-9]+(?:\.[0-9]{1,2})?$/, "Amount must be a valid number")
    .refine(
      (val) => {
        const raw = String(val || "")
          .replace(/,/g, "")
          .trim();
        const n = Number(raw);
        return !Number.isNaN(n) && n >= 5000;
      },
      { message: "Minimum amount is 5,000" }
    ),
  reference: z.string().optional(),
});

type FundForm = z.infer<typeof FundSchema>;

export const useFundWalletMutation = () => {
  const queryClient = useQueryClient();
  const form = useForm<FundForm>({
    resolver: zodResolver(FundSchema),
    defaultValues: { amount: "" },
  });

  const mutation = useMutation({
    mutationFn: async ({
      amount,
      reference,
    }: {
      amount: number;
      reference: string;
    }) => {
      const res = await authApi.post(`/api/wallet/deposit`, {
        amount,
        reference,
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate related queries so UI refreshes (transactions & profile balances)
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success("Wallet funded");
    },
    onError: (err: unknown) => {
      try {
        const msg = getApiErrorMessage(err);
        toast.error(msg || "Failed to fund wallet");
      } catch {
        toast.error("Failed to fund wallet");
      }
    },
  });

  const submitFund = async () => {
    const onValid = async (values: FundForm) => {
      const raw = String(values.amount || "")
        .replace(/,/g, "")
        .trim();
      const amount = Number(raw);
      const reference = values.reference;
      await mutation.mutateAsync({ amount, reference: reference || "" });
      form.reset();
    };

    const onInvalid = (errors: Record<string, unknown>) => {
      // bubble validation errors to caller if needed
      throw errors;
    };

    const handler = form.handleSubmit(onValid, onInvalid);
    return handler();
  };

  return { form, mutation, submitFund };
};

export default useFundWalletMutation;
