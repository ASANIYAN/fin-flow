import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordSchema,
  type ForgotPasswordFormType,
} from "../utils/validation";
import type { ForgotPasswordResponse } from "../utils/types";
import { useMutation } from "@tanstack/react-query";
import { unauthApi } from "@/services/unauth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { toast } from "sonner";

type UseForgotPasswordFormReturn = {
  form: ReturnType<typeof useForm<ForgotPasswordFormType>>;
  mutation: {
    isLoading: boolean;
    mutate: (data: ForgotPasswordFormType) => void;
  };
};

const FORGOT_PASSWORD_ENDPOINT = "/api/auth/forgot-password";
const FORGOT_PASSWORD_SUCCESS_MESSAGE =
  "Password reset link sent to your email. Please check your inbox.";

export const useForgotPasswordForm = (): UseForgotPasswordFormReturn => {
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (
      data: ForgotPasswordFormType
    ): Promise<ForgotPasswordResponse> => {
      const response = await unauthApi.post<ForgotPasswordResponse>(
        FORGOT_PASSWORD_ENDPOINT,
        data
      );
      return response.data;
    },
    onError: (error) => {
      const errorMsg = getApiErrorMessage(error);
      toast.error(errorMsg);
    },
    onSuccess: () => {
      toast.success(FORGOT_PASSWORD_SUCCESS_MESSAGE);
      form.reset(); // Clear the form after successful submission
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
