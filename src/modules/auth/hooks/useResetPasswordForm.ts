import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  type ResetPasswordFormType,
} from "../utils/validation";
import type {
  ResetPasswordResponse,
  ResetPasswordPayload,
} from "../utils/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { unauthApi } from "@/services/unauth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { toast } from "sonner";

type UseResetPasswordFormReturn = {
  form: ReturnType<typeof useForm<ResetPasswordFormType>>;
  mutation: {
    isLoading: boolean;
    mutate: (data: ResetPasswordFormType) => void;
  };
};

const RESET_PASSWORD_ENDPOINT = "/api/auth/reset-password";
const RESET_PASSWORD_SUCCESS_MESSAGE =
  "Password reset successfully! You can now login with your new password.";

export const useResetPasswordForm = (): UseResetPasswordFormReturn => {
  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mutation = useMutation({
    mutationFn: async (
      data: ResetPasswordFormType
    ): Promise<ResetPasswordResponse> => {
      const token = searchParams.get("token");

      if (!token) {
        throw new Error(
          "Reset token is missing. Please use a valid reset link."
        );
      }

      // Transform form data to match API payload
      const payload: ResetPasswordPayload = {
        token,
        newPassword: data.password,
      };

      const response = await unauthApi.post<ResetPasswordResponse>(
        RESET_PASSWORD_ENDPOINT,
        payload
      );
      return response.data;
    },
    onError: (error) => {
      const errorMsg = getApiErrorMessage(error);
      toast.error(errorMsg);
    },
    onSuccess: () => {
      toast.success(RESET_PASSWORD_SUCCESS_MESSAGE);
      void navigate(`/login`);
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
