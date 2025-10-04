import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/auth-services/axiosInstance";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { TransactionsListResponse } from "@/modules/wallet/types";

const TRANSACTIONS_ENDPOINT = "/api/user/transactions";

export const useTransactionsQuery = (
  params: { page?: number; pageSize?: number } = {}
) => {
  const { page = 1, pageSize = 10 } = params;

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["wallet-transactions", page, pageSize],
    queryFn: async (): Promise<TransactionsListResponse["data"]> => {
      try {
        const searchParams = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
        });

        const res = await authApi.get<TransactionsListResponse>(
          `${TRANSACTIONS_ENDPOINT}?${searchParams.toString()}`
        );
        if (!res.data.success)
          throw new Error(res.data.message || "Failed to fetch transactions");
        return res.data.data;
      } catch (err) {
        const msg = getApiErrorMessage(err);
        toast.error(msg || "Failed to fetch transactions");
        throw err;
      }
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });

  return {
    transactions: data?.transactions || [],
    page: data?.page || page,
    pageSize: data?.pageSize || pageSize,
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
