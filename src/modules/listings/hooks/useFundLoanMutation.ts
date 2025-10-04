import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FundPayload = {
  id: string;
  amount: number;
};

export const useFundLoanMutation = () => {
  const FundSchema = z.object({
    amount: z
      .string()
      .min(1, "Amount is required")
      .regex(/^[0-9]+(\.[0-9]{1,2})?$/, "Amount must be a valid number"),
  });

  type FundFormType = z.infer<typeof FundSchema>;

  const form = useForm<FundFormType>({
    resolver: zodResolver(FundSchema),
    defaultValues: { amount: "" },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, amount }: FundPayload) => {
      const response = await authApi.post(`/api/loans/${id}/fund`, { amount });
      return response.data;
    },
    onError: (error) => {
      try {
        const msg = getApiErrorMessage(error);
        toast.error(msg || "Failed to fund loan");
      } catch {
        toast.error("Failed to fund loan");
      }
    },
    onSuccess: () => {
      toast.success("Funding request submitted");
    },
  });

  const submitFund = async (loanId: string) => {
    const onValid = async (values: FundFormType) => {
      const raw = String(values.amount || "")
        .replace(/,/g, "")
        .trim();
      const amount = Number(raw);
      const res = await mutation.mutateAsync({ id: loanId, amount });
      form.reset();
      return res;
    };

    const onInvalid = (errors: Record<string, unknown>) => {
      // throw to allow caller to catch
      throw errors;
    };

    const handler = form.handleSubmit(onValid, onInvalid);
    // call handler to trigger validation and submission
    return handler();
  };

  return {
    form,
    mutation: {
      isLoading: mutation.isPending,
      mutate: submitFund,
    },
  };
};
