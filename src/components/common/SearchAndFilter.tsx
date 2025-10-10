import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";

type Column = {
  id: string;
  label: string;
};

interface SearchAndFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  columns?: Column[];
  visibleColumns?: string[];
  onColumnToggle?: (id: string) => void;

  placeholder?: string;
}

const SearchAndFilter = ({
  searchValue,
  onSearchChange,
  placeholder = "Search loans...",
}: SearchAndFilterProps) => {
  return (
    <section className="flex flex-col md:flex-row gap-6 md:items-center">
      <div className="flex-1 flex items-center !bg-white shadow-sm gap-2 rounded p-1 h-12.5 w-full max-w-155">
        <Icon
          width="16"
          height="16"
          icon="humbleicons:search"
          color="var(--color-gray900)"
        />
        <Input
          className="text-xs leading-4 !bg-white placeholder:text-gray-400 border-none shadow-none focus-visible:ring-0 focus-visible:outline-none"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </section>
  );
};

export default SearchAndFilter;
