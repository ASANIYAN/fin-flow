import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/auth-services/axiosInstance";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { BanksListResponse } from "@/modules/wallet/types";

const BANKS_ENDPOINT = "/api/paystack/banks";

export const useBanksQuery = () => {
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["paystack-banks"],
    queryFn: async (): Promise<BanksListResponse["data"]> => {
      try {
        const res = await authApi.get<BanksListResponse>(BANKS_ENDPOINT);
        if (!res.data.success)
          throw new Error(res.data.message || "Failed to fetch banks");
        return res.data.data;
      } catch (err) {
        const msg = getApiErrorMessage(err);
        toast.error(msg || "Failed to fetch banks");
        throw err;
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  return {
    banks: data || [],
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
