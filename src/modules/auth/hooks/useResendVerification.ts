import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { unauthApi } from "@/services/unauth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export interface ResendVerificationPayload {
  email: string;
}

export interface ResendVerificationResponse {
  message: string;
}

const RESEND_VERIFICATION_ENDPOINT = "/api/auth/resend-verification";
const RESEND_SUCCESS_MESSAGE = "Verification email sent successfully";

export const useResendVerification = () => {
  const mutation = useMutation({
    mutationFn: async (
      payload: ResendVerificationPayload
    ): Promise<ResendVerificationResponse> => {
      const response = await unauthApi.post<ResendVerificationResponse>(
        RESEND_VERIFICATION_ENDPOINT,
        payload
      );

      return response.data;
    },
    onError: (error) => {
      console.error("Resend verification error:", error);

      try {
        const errorMsg = getApiErrorMessage(error);
        toast.error(errorMsg || "Failed to send verification email");
      } catch (err) {
        console.error("Error handling failed:", err);
        toast.error("Failed to send verification email");
      }
    },
    onSuccess: (data) => {
      try {
        toast.success(data.message || RESEND_SUCCESS_MESSAGE);
      } catch (err) {
        console.error("Success handling failed:", err);
        toast.success(RESEND_SUCCESS_MESSAGE);
      }
    },
  });

  return {
    resendVerification: mutation.mutate,
    isResending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
