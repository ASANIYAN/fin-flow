import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateLoanSchema, type CreateLoanFormType } from "../utils/validation";
import type { CreateLoanResponse } from "../utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";

type CreateLoanPayload = {
  title: string;
  description: string;
  amountRequested: number;
  interestRate: number;
  duration: number;
  durationUnit: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
};

type UseCreateLoanFormReturn = {
  form: ReturnType<typeof useForm<CreateLoanFormType>>;
  mutation: {
    isLoading: boolean;
    mutate: (data: CreateLoanPayload) => void;
  };
};

const CREATE_LOAN_ENDPOINT = "/api/loans/create-loan";
const CREATE_LOAN_SUCCESS_MESSAGE = "Loan created successfully";

export const useCreateLoanForm = (): UseCreateLoanFormReturn => {
  const form = useForm({
    resolver: zodResolver(CreateLoanSchema),
    defaultValues: {
      title: "",
      description: "",
      amountRequested: undefined,
      interestRate: undefined,
      duration: undefined,
      durationUnit: "MONTHS" as "DAYS" | "WEEKS" | "MONTHS" | "YEARS",
    },
  });

  const navigate = useNavigate();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      data: CreateLoanPayload
    ): Promise<CreateLoanResponse> => {
      const response = await authApi.post<CreateLoanResponse>(
        CREATE_LOAN_ENDPOINT,
        data
      );
      return response.data;
    },
    onError: (error) => {
      try {
        const errorMsg = getApiErrorMessage(error);
        toast.error(errorMsg || "An error occurred while creating the loan");
      } catch (err) {
        console.error("Error handling failed:", err);
        toast.error("An error occurred while creating the loan");
      }
    },
    onSuccess: () => {
      try {
        // Reset form with default values
        form.reset({
          title: "",
          description: "",
          amountRequested: undefined,
          interestRate: undefined,
          duration: undefined,
          durationUnit: "MONTHS" as "DAYS" | "WEEKS" | "MONTHS" | "YEARS",
        });

        toast.success(CREATE_LOAN_SUCCESS_MESSAGE);
        queryClient.invalidateQueries({ queryKey: ["dashboard", user?.role] });
        // Navigate to dashboard or loan details
        void navigate(`/dashboard`);
      } catch (err) {
        console.error("Success handling failed:", err);
        toast.error("Error creating loan");
      }
    },
  });

  return {
    form,
    mutation: {
      isLoading: mutation.isPending,
      mutate: mutation.mutate,
    },
  };
};
