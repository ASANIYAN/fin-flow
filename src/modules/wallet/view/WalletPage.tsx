import React from "react";
import WalletStatus from "../components/WalletStatus";
import WalletTransactionsTable from "../components/WalletTransactionsTable";
import { useUserStore } from "@/store/user-store";

const WalletPage: React.FC = () => {
  const { user } = useUserStore();

  type UserWithBalances = { availableBalance?: number; escrowBalance?: number };
  const u = user as unknown as UserWithBalances;
  const available = u?.availableBalance ?? 0;
  const escrow = u?.escrowBalance ?? 0;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold text-[--color-text-primary] mb-1">
          Wallet
        </h1>
        <p className="text-[--color-text-secondary]">
          Manage your wallet, view balances, and track transactions.
        </p>
      </div>
      <WalletStatus available={available} escrow={escrow} />
      <WalletTransactionsTable />
    </div>
  );
};

export default WalletPage;
