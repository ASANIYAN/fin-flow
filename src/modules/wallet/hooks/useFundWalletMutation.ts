import { useMutation } from "@tanstack/react-query";
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
    .regex(/^[0-9]+(?:\.[0-9]{1,2})?$/, "Amount must be a valid number"),
});

type FundForm = z.infer<typeof FundSchema>;

export const useFundWalletMutation = () => {
  const form = useForm<FundForm>({
    resolver: zodResolver(FundSchema),
    defaultValues: { amount: "" },
  });

  const mutation = useMutation({
    mutationFn: async (amount: number) => {
      const res = await authApi.post(`/api/user/wallet/fund`, { amount });
      return res.data;
    },
    onSuccess: () => {
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
      await mutation.mutateAsync(amount);
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
