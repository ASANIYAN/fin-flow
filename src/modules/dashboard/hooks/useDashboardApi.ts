import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { BorrowerDashboardData, LenderDashboardData } from "../types";

interface UnifiedDashboardApiResponse {
  success: boolean;
  message: string;
  data: {
    totalApplications: number;
    pendingApplications: number;
    activeLoansAsBorrower: Array<{
      id: string;
      title: string;
      description: string;
      amountRequested: number;
      amountFunded: number;
      interestRate: number;
      duration: number;
      durationUnit: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
      totalInterest: number;
      principalRepaid: number;
      status: "FUNDING" | "FUNDED" | "REPAID" | "DEFAULTED" | "PENDING";
      borrowerId: string;
      borrower: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isEmailVerified: boolean;
        emailVerifiedAt: string;
        availableBalance: number;
        escrowBalance: number;
        createdAt: string;
      };
      createdAt: string;
      updatedAt: string;
    }>;
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
      status: "FUNDING" | "FUNDED" | "REPAID" | "DEFAULTED" | "PENDING";
      borrower: string;
      progress: number;
      createdAt: string;
    }>;
    availableRoles: Array<"BORROWER" | "LENDER">;
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
          activeLoans: response.data.data.activeLoansAsBorrower.map((loan) => ({
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

export const useUnifiedDashboardData = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["unified-dashboard"],
    queryFn: async (): Promise<{
      borrower: BorrowerDashboardData;
      lender: LenderDashboardData;
    }> => {
      try {
        const response = await authApi.get<UnifiedDashboardApiResponse>(
          DASHBOARD_ENDPOINT
        );

        const borrowerData: BorrowerDashboardData = {
          totalApplications: response.data.data.totalApplications,
          pendingApplications: response.data.data.pendingApplications,
          activeLoans: response.data.data.activeLoansAsBorrower.map((loan) => ({
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

        const lenderData: LenderDashboardData = {
          investmentSummary: response.data.data.investmentSummary,
          newListings: response.data.data.newListings.map((listing) => ({
            id: listing.id,
            title: listing.title,
            borrower: listing.borrower,
            amountRequested: listing.amountRequested,
            interestRate: listing.interestRate,
            duration: listing.duration,
            durationUnit: "MONTHS", // Default to MONTHS - update based on actual API field
            totalInterest:
              (listing.amountRequested * listing.interestRate) / 100,
            progress: listing.progress,
          })),
        };

        return { borrower: borrowerData, lender: lenderData };
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
