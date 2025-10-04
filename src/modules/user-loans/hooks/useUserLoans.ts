import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { UserLoansResponse, UserLoansQueryParams } from "../types";

const USER_LOANS_ENDPOINT = "/api/loans/my-loans";

export const useUserLoans = (params: UserLoansQueryParams = {}) => {
  const {
    page = 1,
    pageSize = 10,
    q = "",
    minAmount,
    maxAmount,
    status,
  } = params;

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["user-loans", page, pageSize, q, minAmount, maxAmount, status],
    queryFn: async (): Promise<UserLoansResponse["data"]> => {
      try {
        const searchParams = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
        });

        if (q.trim()) {
          searchParams.append("q", q.trim());
        }

        if (minAmount !== undefined) {
          searchParams.append("minAmount", minAmount.toString());
        }

        if (maxAmount !== undefined) {
          searchParams.append("maxAmount", maxAmount.toString());
        }

        if (status) {
          searchParams.append("status", status);
        }

        const response = await authApi.get<UserLoansResponse>(
          `${USER_LOANS_ENDPOINT}?${searchParams.toString()}`
        );

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to fetch user loans"
          );
        }

        return response.data.data;
      } catch (error) {
        const errorMsg = getApiErrorMessage(error);
        toast.error(errorMsg || "Failed to fetch your loans");
        throw error;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    enabled: true,
  });

  return {
    loans: data?.loans || [],
    pagination: {
      page: data?.page || 0,
      pageSize: data?.pageSize || 10,
      totalItems: data?.totalCount || 0,
      totalPages: data?.totalPages || 0,
    },
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
