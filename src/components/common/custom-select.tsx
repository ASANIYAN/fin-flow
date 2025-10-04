"use client";

import type { Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  labelClassName?: string;
  selectClassName?: string;
  selectContentClassName?: string;
  selectTriggerClassName?: string;
  selectValueClassName?: string;
  selectItemClassName?: string;
  labelLeftComponent?: React.ReactNode;
  options: { value: string; label: string }[];
}

const CustomSelect: React.FC<
  CustomSelectProps & React.SelectHTMLAttributes<HTMLSelectElement>
> = ({
  name,
  label,
  control,
  placeholder = "",
  labelClassName,
  selectContentClassName,
  selectTriggerClassName,
  selectValueClassName,
  selectItemClassName,
  labelLeftComponent,
  options,
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

            {labelLeftComponent}
          </div>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={cn(
                  "w-full py-4 placeholder:text-black/50 text-base shadow-none focus-visible:ring-0 focus-visible:outline-none !h-12 border !border-black",
                  selectTriggerClassName
                )}
              >
                <SelectValue
                  placeholder={placeholder}
                  className={cn("text-black", selectValueClassName)}
                />
              </SelectTrigger>
              <SelectContent
                className={cn(
                  "bg-white rounded-2xl shadow-md",
                  selectContentClassName
                )}
              >
                {options.map((option, idx) => (
                  <SelectItem
                    key={`${option.value}-${idx}`}
                    value={option.value}
                    className={cn(
                      "font-manrope text-xs font-medium",
                      selectItemClassName
                    )}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;
