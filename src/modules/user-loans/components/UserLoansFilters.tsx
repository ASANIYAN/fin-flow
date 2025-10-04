import React from "react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoanContext } from "../hooks/useLoanContext";

const UserLoansFilters: React.FC = () => {
  const {
    searchQuery,
    statusFilter,
    minAmount,
    maxAmount,
    setSearchQuery,
    setStatusFilter,
    setMinAmount,
    setMaxAmount,
    clearFilters,
  } = useLoanContext();

  return (
    <>
      {/* <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Search
          </label>
          <SearchAndFilter
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search loans..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Status
          </label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="!h-12.5 !bg-white !shadow-sm">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="FUNDING">Funding</SelectItem>
              <SelectItem value="FUNDED">Funded</SelectItem>
              <SelectItem value="REPAID">Repaid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Min Amount
          </label>
          <Input
            placeholder="0"
            className="!bg-white h-12.5 border-none shadow-sm focus-visible:ring-0"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Max Amount
          </label>
          <Input
            placeholder="1000000"
            className="!bg-white h-12.5 border-none shadow-sm focus-visible:ring-0"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={clearFilters} className="text-sm">
          Clear Filters
        </Button>
      </div>
      {/* </CardContent>
    </Card> */}
    </>
  );
};

export default UserLoansFilters;
