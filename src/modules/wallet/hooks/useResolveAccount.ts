import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/auth-services/axiosInstance";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

type ResolvePayload = {
  accountNumber: string;
  bankCode: string;
};

export const useResolveAccount = () => {
  return useMutation({
    mutationFn: async (payload: ResolvePayload) => {
      const res = await authApi.post("/api/paystack/resolve-account", payload);
      return res.data;
    },
    onError: (err: unknown) => {
      try {
        const msg = getApiErrorMessage(err);
        toast.error(msg || "Failed to resolve account");
      } catch {
        toast.error("Failed to resolve account");
      }
    },
  });
};

export default useResolveAccount;
