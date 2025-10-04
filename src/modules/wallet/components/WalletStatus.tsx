import React, { useState } from "react";
import StatusCard from "@/modules/dashboard/components/StatusCard";
import FundWalletModal from "./FundWalletModal";
import WithdrawModal from "./WithdrawModal";
import { Button } from "@/components/ui/button";

const WalletStatus: React.FC<{ available: number; escrow: number }> = ({
  available,
  escrow,
}) => {
  const [fundOpen, setFundOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <section className="space-y-5">
      <div className="flex gap-3 items-center">
        <Button
          className="px-4 py-2 bg-brand-primary hover:bg-brand-primary text-white rounded h-10 cursor-pointer"
          onClick={() => setFundOpen(true)}
        >
          Fund Wallet
        </Button>
        <Button
          className="px-4 py-2 bg-white text-brand-primary rounded h-10 cursor-pointer border border-brand-primary hover:bg-white shadow-none transition-colors"
          onClick={() => setWithdrawOpen(true)}
        >
          Withdraw
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatusCard
          title="Available Balance"
          value={available}
          icon="material-symbols:account-balance-wallet"
        />
        <StatusCard
          title="Escrow Balance"
          value={escrow}
          icon="material-symbols:account-balance"
        />

        <FundWalletModal
          open={fundOpen}
          onOpenChange={setFundOpen}
          onSuccess={() => console.log("Fund success")}
        />
        <WithdrawModal
          open={withdrawOpen}
          onOpenChange={setWithdrawOpen}
          onSuccess={() => console.log("Withdraw success")}
        />
      </div>
    </section>
  );
};

export default WalletStatus;
