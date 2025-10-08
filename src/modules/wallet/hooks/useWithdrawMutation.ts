import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/services/auth-services/axiosInstance";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

const WithdrawSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^[0-9]+(?:\.[0-9]{1,2})?$/, "Amount must be a valid number"),
  bankCode: z.string().min(1, "Bank is required"),
  accountNumber: z
    .string()
    .min(1, "Account number is required")
    .regex(/^[0-9]{6,12}$/, "Account number must be digits"),
});

type WithdrawForm = z.infer<typeof WithdrawSchema>;

export const useWithdrawMutation = () => {
  const form = useForm<WithdrawForm>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: { amount: "", bankCode: "", accountNumber: "" },
  });

  const mutation = useMutation({
    mutationFn: async (payload: {
      amount: number;
      bankCode: string;
      accountNumber: string;
    }) => {
      const res = await authApi.post(`/api/wallet/withdraw`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Withdrawal requested");
    },
    onError: (err: unknown) => {
      try {
        const msg = getApiErrorMessage(err);
        toast.error(msg || "Failed to request withdrawal");
      } catch {
        toast.error("Failed to request withdrawal");
      }
    },
  });

  const submitWithdraw = async () => {
    const onValid = async (values: WithdrawForm) => {
      const raw = String(values.amount || "")
        .replace(/,/g, "")
        .trim();
      const amount = Number(raw);
      await mutation.mutateAsync({
        amount,
        bankCode: values.bankCode,
        accountNumber: values.accountNumber,
      });
      form.reset();
    };

    const onInvalid = (errors: Record<string, unknown>) => {
      throw errors;
    };

    const handler = form.handleSubmit(onValid, onInvalid);
    return handler();
  };

  return { form, mutation, submitWithdraw };
};

export default useWithdrawMutation;
