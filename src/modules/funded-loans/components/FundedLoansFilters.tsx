import React from "react";
import { Icon } from "@iconify/react";
import SearchAndFilter from "@/components/common/SearchAndFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFundedLoansContext } from "../hooks/useFundedLoansContext";

const FundedLoansFilters: React.FC = () => {
  const {
    searchQuery,
    statusFilter,
    sortBy,
    setSearchQuery,
    setStatusFilter,
    setSortBy,
  } = useFundedLoansContext();

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "ACTIVE", label: "Active" },
    { value: "REPAID", label: "Repaid" },
    { value: "DEFAULTED", label: "Defaulted" },
    { value: "OVERDUE", label: "Overdue" },
  ];

  const sortOptions = [
    { value: "createdAt_desc", label: "Newest First" },
    { value: "createdAt_asc", label: "Oldest First" },
    { value: "myFundingAmount_desc", label: "Highest Investment" },
    { value: "myFundingAmount_asc", label: "Lowest Investment" },
    { value: "actualEarnings_desc", label: "Highest Earnings" },
    { value: "actualEarnings_asc", label: "Lowest Earnings" },
    { value: "fundingDate_desc", label: "Recently Funded" },
    { value: "fundingDate_asc", label: "Earliest Funded" },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <SearchAndFilter
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search funded loans..."
      />

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2 min-w-[200px]">
          <Icon icon="material-symbols:filter-list" width={16} height={16} />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="!h-10 !bg-white !shadow-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 min-w-[200px]">
          <Icon icon="material-symbols:sort" width={16} height={16} />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="!h-10 !bg-white !shadow-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FundedLoansFilters;
