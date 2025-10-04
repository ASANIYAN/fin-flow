"use client";

import type { Control } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface ComboboxSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  options: Option[];
  searchPlaceholder?: string;
  emptyMessage?: string;
}

const ComboboxSelect: React.FC<ComboboxSelectProps> = ({
  name,
  label,
  control,
  placeholder = "",
  labelClassName,
  triggerClassName,
  contentClassName,
  itemClassName,
  options,
  searchPlaceholder,
  emptyMessage,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <div className="flex justify-between items-center">
            <FormLabel
              className={cn(
                "text-black/70 text-base leading-5 font-normal",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
          </div>

          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between text-left",
                    !field.value && "text-muted-foreground",
                    triggerClassName
                  )}
                >
                  {field.value
                    ? options.find((o) => o.value === field.value)?.label
                    : placeholder || "Select..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className={cn("w-full p-0", contentClassName)}>
                <Command>
                  <CommandInput
                    placeholder={searchPlaceholder ?? "Search..."}
                  />
                  <CommandList>
                    <CommandEmpty>{emptyMessage ?? "No results."}</CommandEmpty>
                    <CommandGroup>
                      {options.map((opt, idx) => (
                        <CommandItem
                          value={opt.label}
                          key={`${opt.value}-${idx}`}
                          onSelect={() => field.onChange(opt.value)}
                          className={cn(itemClassName)}
                        >
                          {opt.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              opt.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboboxSelect;
