import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { BorrowerDashboardData } from "../types";

interface UnifiedDashboardApiResponse {
  success: boolean;
  message: string;
  data: {
    totalApplications: number;
    pendingApplications: number;
    activeLoans: Array<{
      id: string;
      title: string;
      description: string;
      amountRequested: number;
      amountFunded: number;
      interestRate: number;
      duration: number;
      durationUnit: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
      totalInterest: number;
      status: "FUNDING" | "FUNDED" | "REPAID" | "DEFAULTED" | "PENDING";
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

const DASHBOARD_ENDPOINT = "/api/loans/dashboard";

export const useDashboardData = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async (): Promise<BorrowerDashboardData> => {
      try {
        const response = await authApi.get<UnifiedDashboardApiResponse>(
          DASHBOARD_ENDPOINT
        );

        return {
          totalApplications: response.data.data.totalApplications,
          pendingApplications: response.data.data.pendingApplications,
          activeLoans: response.data.data.activeLoans.map((loan) => ({
            id: loan.id,
            title: loan.title,
            status: loan.status,
            amountRequested: loan.amountRequested,
            amountFunded: loan.amountFunded,
            interestRate: loan.interestRate,
            duration: loan.duration,
            durationUnit: loan.durationUnit,
            totalInterest: loan.totalInterest ?? 0,
            progress: Math.round(
              (loan.amountFunded / loan.amountRequested) * 100
            ),
          })),
        };
      } catch (error) {
        const errorMsg = getApiErrorMessage(error);
        toast.error(errorMsg || "Failed to fetch dashboard data");
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const refetchMutation = useMutation({
    mutationFn: async () => {
      return refetch();
    },
    onError: (error) => {
      const errorMsg = getApiErrorMessage(error);
      toast.error(errorMsg || "Failed to refresh dashboard data");
    },
    onSuccess: () => {
      toast.success("Dashboard data refreshed successfully");
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch: refetchMutation.mutate,
    isRefetching: refetchMutation.isPending,
  };
};
