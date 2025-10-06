import { type Control } from "react-hook-form";

import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CustomInputProps {
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  append?: ReactNode;
  prepend?: ReactNode;
  inputClassName?: string;
  containerClassName?: string;
  formLabelClassName?: string;
}

const CustomInput: React.FC<
  CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  name,
  label,
  control,
  inputClassName,
  formLabelClassName,
  containerClassName,
  append,
  prepend,
  error,
  ...rest
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel
            className={cn(
              "text-black/70 text-base leading-5 font-normal",
              formLabelClassName
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <div
              className={cn(
                "flex justify-between items-center gap-2 bg-grey-1 h-12 px-3 border border-black",
                containerClassName
              )}
            >
              {append}
              <Input
                className={cn(
                  "flex-1 py-4 placeholder:text-black/50 text-xs border-none shadow-none focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed",
                  inputClassName
                )}
                {...field}
                {...rest}
              />
              {prepend}
            </div>
          </FormControl>
          {error && (
            <span className="text-red-500 text-xs mt-1 block">{error}</span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
