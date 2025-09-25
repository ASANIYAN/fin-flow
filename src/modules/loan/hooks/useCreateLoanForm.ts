import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateLoanSchema, type CreateLoanFormType } from "../utils/validation";
import type { CreateLoanResponse } from "../utils/types";
import { useMutation } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { useNavigate } from "react-router-dom";

type UseCreateLoanFormReturn = {
  form: ReturnType<typeof useForm<CreateLoanFormType>>;
  mutation: {
    isLoading: boolean;
    mutate: (data: CreateLoanFormType) => void;
  };
};

const CREATE_LOAN_ENDPOINT = "/api/loans/create-loan";
const CREATE_LOAN_SUCCESS_MESSAGE = "Loan created successfully";

export const useCreateLoanForm = (): UseCreateLoanFormReturn => {
  const form = useForm<CreateLoanFormType>({
    resolver: zodResolver(CreateLoanSchema),
    defaultValues: {
      title: "",
      description: "",
      amountRequested: "",
      interestRate: "",
      duration: "",
      durationUnit: "MONTHS",
    },
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (
      data: CreateLoanFormType
    ): Promise<CreateLoanResponse> => {
      const response = await authApi.post<CreateLoanResponse>(
        CREATE_LOAN_ENDPOINT,
        data
      );
      return response.data;
    },
    onError: (error) => {
      console.log(error, "Create loan error");

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
          amountRequested: "",
          interestRate: "",
          duration: "",
          durationUnit: "MONTHS",
        });

        toast.success(CREATE_LOAN_SUCCESS_MESSAGE);
        // Navigate to dashboard or loan details
        void navigate(`/dashboard`);
      } catch (err) {
        console.error("Success handling failed:", err);
        toast.success("Loan created successfully");
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
