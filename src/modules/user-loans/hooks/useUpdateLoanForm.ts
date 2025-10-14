import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateLoanSchema,
  type CreateLoanFormType,
} from "../../loan/utils/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "@/lib/getApiErrorMessage";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import type { UpdateLoanResponse, UpdateLoanPayload } from "../types";

type UseUpdateLoanFormReturn = {
  form: ReturnType<typeof useForm<CreateLoanFormType>>;
  mutation: {
    isLoading: boolean;
    mutate: (data: UpdateLoanPayload) => void;
  };
};

const UPDATE_LOAN_SUCCESS_MESSAGE = "Loan updated successfully";

export const useUpdateLoanForm = (
  loanId: string,
  onSuccess?: () => void
): UseUpdateLoanFormReturn => {
  const form = useForm({
    resolver: zodResolver(CreateLoanSchema),
    defaultValues: {
      title: "",
      description: "",
      amountRequested: "",
      interestRate: "",
      duration: "",
      durationUnit: "MONTHS" as "DAYS" | "WEEKS" | "MONTHS" | "YEARS",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      data: UpdateLoanPayload
    ): Promise<UpdateLoanResponse> => {
      const response = await authApi.patch<UpdateLoanResponse>(
        `/api/loans/${loanId}/update`,
        data
      );
      return response.data;
    },
    onError: (error) => {
      try {
        const { message, fieldErrors } = handleApiError(error);

        // Set field errors if available
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            form.setError(field as keyof CreateLoanFormType, {
              type: "server",
              message: messages[0], // Use the first message
            });
          });
        }

        // Show the main error message
        toast.error(message || "An error occurred while updating the loan");
      } catch (err) {
        console.error("Error handling failed:", err);
        toast.error("An error occurred while updating the loan");
      }
    },
    onSuccess: () => {
      try {
        toast.success(UPDATE_LOAN_SUCCESS_MESSAGE);

        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: ["user-loans"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });

        // Call the onSuccess callback if provided
        onSuccess?.();
      } catch (err) {
        console.error("Success handling failed:", err);
        toast.error("Error updating loan");
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
