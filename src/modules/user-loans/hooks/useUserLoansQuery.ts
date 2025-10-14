import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { UserLoan } from "../types";

interface UseUserLoansQueryParams {
  page: number;
  pageSize: number;
  q?: string;
  status?: string;
  minAmount?: number;
  maxAmount?: number;
}

interface UseUserLoansQueryReturn {
  loans: UserLoan[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
}

const USER_LOANS_ENDPOINT = "/api/loans/my-loans";

export const useUserLoansQuery = (
  params: UseUserLoansQueryParams
): UseUserLoansQueryReturn => {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["user-loans", params],
    queryFn: async (): Promise<{
      loans: UserLoan[];
      page: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    }> => {
      try {
        const searchParams = new URLSearchParams({
          page: params.page.toString(),
          pageSize: params.pageSize.toString(),
        });

        if (params.q?.trim()) {
          searchParams.append("q", params.q.trim());
        }

        if (params.minAmount !== undefined) {
          searchParams.append("minAmount", params.minAmount.toString());
        }

        if (params.maxAmount !== undefined) {
          searchParams.append("maxAmount", params.maxAmount.toString());
        }

        if (params.status) {
          searchParams.append("status", params.status);
        }

        const response = await authApi.get(
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

  // Extract data from response
  const loans = data?.loans || [];
  const pagination = {
    page: data?.page || params.page,
    pageSize: data?.pageSize || params.pageSize,
    totalItems: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
  };

  return {
    loans,
    pagination,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
