import React from "react";
import WalletStatus from "../components/WalletStatus";
import WalletTransactionsTable from "../components/WalletTransactionsTable";
import { useGetUserProfile } from "@/modules/profile/hooks/useGetUserProfile";
import { Skeleton } from "@/components/ui/skeleton";

const WalletPage: React.FC = () => {
  const { data, isLoading } = useGetUserProfile();

  const user = data?.data;

  const available = user?.availableBalance ?? 0;
  const escrow = user?.escrowBalance ?? 0;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-80" />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-color-text-primary mb-1">
              Wallet
            </h1>
            <p className="text-color-text-secondary">
              Manage your wallet, view balances, and track transactions.
            </p>
          </>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        <WalletStatus available={available} escrow={escrow} />
      )}

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-56" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <WalletTransactionsTable />
      )}
    </div>
  );
};

export default WalletPage;
