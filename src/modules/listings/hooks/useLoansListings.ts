import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { LoansListResponse, LoansQueryParams } from "../types";

const LOANS_ENDPOINT = "/api/loans/open";

export const useLoansListings = (params: LoansQueryParams = {}) => {
  const { page = 1, pageSize = 10, query = "" } = params;

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["loans-listings", page, pageSize, query],
    queryFn: async (): Promise<LoansListResponse["data"]> => {
      try {
        const searchParams = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
        });

        if (query.trim()) {
          searchParams.append("query", query.trim());
        }

        const response = await authApi.get<LoansListResponse>(
          `${LOANS_ENDPOINT}?${searchParams.toString()}`
        );

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to fetch loans");
        }

        return response.data.data;
      } catch (error) {
        const errorMsg = getApiErrorMessage(error);
        toast.error(errorMsg || "Failed to fetch loan listings");
        throw error;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    enabled: true,
  });

  return {
    loans: data?.loans || [],
    pagination: data?.pagination || {
      page: 0,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    },
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
