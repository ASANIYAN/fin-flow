import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { BorrowerDashboardData, LenderDashboardData } from "../types";

interface BorrowerApiResponse {
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
      status: "FUNDING" | "FUNDED" | "COMPLETED" | "DEFAULTED" | "PENDING";
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

interface LenderApiResponse {
  success: boolean;
  message: string;
  data: {
    investmentSummary: {
      totalInvested: number;
      totalEarnings: number;
      activeInvestments: number;
    };
    newListings: Array<{
      id: string;
      title: string;
      description: string;
      amountRequested: number;
      amountFunded: number;
      interestRate: number;
      duration: number;
      status: "FUNDING" | "FUNDED" | "COMPLETED" | "DEFAULTED" | "PENDING";
      borrower: string;
      progress: number;
      createdAt: string;
    }>;
  };
}

type DashboardApiResponse = BorrowerApiResponse | LenderApiResponse;

const DASHBOARD_ENDPOINT = "/api/loans/dashboard";

export const useDashboardData = (userRole: "LENDER" | "BORROWER") => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dashboard", userRole],
    queryFn: async (): Promise<BorrowerDashboardData | LenderDashboardData> => {
      try {
        const response = await authApi.get<DashboardApiResponse>(
          DASHBOARD_ENDPOINT
        );

        if (userRole === "BORROWER") {
          const borrowerResponse = response.data as BorrowerApiResponse;
          return {
            totalApplications: borrowerResponse.data.totalApplications,
            pendingApplications: borrowerResponse.data.pendingApplications,
            activeLoans: borrowerResponse.data.activeLoans.map((loan) => ({
              id: loan.id,
              title: loan.title,
              status: loan.status,
              amountRequested: loan.amountRequested,
              amountFunded: loan.amountFunded,
              progress: Math.round(
                (loan.amountFunded / loan.amountRequested) * 100
              ),
            })),
          };
        } else {
          const lenderResponse = response.data as LenderApiResponse;
          return {
            investmentSummary: lenderResponse.data.investmentSummary,
            newListings: lenderResponse.data.newListings.map((listing) => ({
              id: listing.id,
              title: listing.title,
              borrower: listing.borrower,
              amountRequested: listing.amountRequested,
              interestRate: listing.interestRate,
              duration: listing.duration,
              progress: listing.progress,
            })),
          };
        }
      } catch (error) {
        const errorMsg = getApiErrorMessage(error);
        toast.error(errorMsg || "Failed to fetch dashboard data");
        throw error;
      }
    },
    enabled: !!userRole,
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
