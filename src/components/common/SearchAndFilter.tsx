import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  showDownloadButton?: boolean;
  onDownload?: () => void;
  placeholder?: string;
}

const SearchAndFilter = ({
  searchValue,
  onSearchChange,
  showDownloadButton = false,
  onDownload,
  placeholder = "Search loans...",
}: SearchAndFilterProps) => {
  return (
    <section className="flex gap-6 items-center">
      <div className="flex-1 flex items-center bg-stone-100 gap-2 rounded p-1 h-12.5 w-full max-w-155">
        <Icon
          width="16"
          height="16"
          icon="humbleicons:search"
          color="var(--color-gray900)"
        />
        <Input
          className="text-xs leading-4 placeholder:text-gray-400 border-none shadow-none focus-visible:ring-0 focus-visible:outline-none"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>

      {showDownloadButton && (
        <Button
          onClick={onDownload}
          className="bg-[--color-brand-primary] hover:bg-[--color-brand-primary]/90 rounded-lg flex items-center gap-1 py-2 px-4 h-12.5"
        >
          <Icon color="#fff" icon="ri:download-2-line" width="20" height="20" />
          <span className="block text-white font-medium text-sm">
            Download Report
          </span>
        </Button>
      )}
    </section>
  );
};

export default SearchAndFilter;
