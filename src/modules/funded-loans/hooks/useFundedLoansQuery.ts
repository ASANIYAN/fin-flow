import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/auth-services/axiosInstance";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { FundedLoansApiResponse, FundedLoansQueryParams } from "../types";

const FUNDED_LOANS_ENDPOINT = "/api/loans/funded";

export const useFundedLoansQuery = (params: FundedLoansQueryParams = {}) => {
  const {
    page = 1,
    pageSize = 10,
    status = "",
    sortBy = "createdAt_desc",
    search = "",
  } = params;

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["funded-loans", page, pageSize, status, sortBy, search],
    queryFn: async (): Promise<FundedLoansApiResponse["data"]> => {
      try {
        const searchParams = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          sortBy,
        });

        // Add optional parameters
        if (status) searchParams.append("status", status);
        if (search) searchParams.append("search", search);

        const response = await authApi.get<FundedLoansApiResponse>(
          `${FUNDED_LOANS_ENDPOINT}?${searchParams.toString()}`
        );

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to fetch funded loans"
          );
        }

        return response.data.data;
      } catch (err) {
        const errorMsg = getApiErrorMessage(err);
        toast.error(errorMsg || "Failed to fetch funded loans");
        throw err;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });

  return {
    loans: data?.loans || [],
    pagination: data?.pagination || {
      page: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0,
    },
    summary: data?.summary || {
      totalFundedAmount: 0,
      totalExpectedEarnings: 0,
      totalActualEarnings: 0,
      activeLoansCount: 0,
      repaidLoansCount: 0,
    },
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
