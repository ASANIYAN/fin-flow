import { useQuery } from "@tanstack/react-query";
import { unauthApi } from "@/services/unauth-services/axiosInstance";

export interface EmailVerificationResponse {
  message: string;
  data?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    role: "LENDER" | "BORROWER";
  };
}

const EMAIL_VERIFICATION_ENDPOINT = "/api/auth/verify-email";

export const useEmailVerification = (token: string | null) => {
  return useQuery({
    queryKey: ["emailVerification", token],
    queryFn: async (): Promise<EmailVerificationResponse> => {
      if (!token) {
        throw new Error("No verification token provided");
      }

      const response = await unauthApi.get<EmailVerificationResponse>(
        `${EMAIL_VERIFICATION_ENDPOINT}/${token}`
      );

      return response.data;
    },
    enabled: !!token, // Only run query if token exists
    retry: false, // Don't retry failed verification attempts
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity, // Verification result doesn't change
  });
};
