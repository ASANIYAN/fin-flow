import React from "react";
import { useTransactionsQuery } from "@/modules/wallet/hooks/useTransactionsQuery";
import { DataTable } from "@/components/common/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WalletTransactionsTable: React.FC = () => {
  const { transactions } = useTransactionsQuery({ page: 1, pageSize: 10 });

  const columns = [
    { header: "Date", accessorKey: "createdAt" },
    { header: "Type", accessorKey: "type" },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (info: unknown) => {
        const i = info as {
          getValue?: () => unknown;
          row?: { original?: { amount?: number } };
        };
        const val = i.getValue ? i.getValue() : i.row?.original?.amount;
        return `₦${Number(val || 0).toLocaleString()}`;
      },
    },
    { header: "Description", accessorKey: "description" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-text-primary">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!transactions || transactions.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <p>No recent transactions</p>
          </div>
        ) : (
          <DataTable
            data={transactions}
            columns={columns}
            className="w-full min-w-250 mb-5"
            pageSize={10}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WalletTransactionsTable;
