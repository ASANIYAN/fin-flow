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
  describedBy?: string;
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
  describedBy,
  ...rest
}) => {
  const fieldId = `${name}-field`;
  const errorId = `${name}-error`;
  const descriptionId = describedBy || undefined;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1">
          {label && (
            <FormLabel
              htmlFor={fieldId}
              className={cn(
                "text-black/70 text-base leading-5 font-normal",
                formLabelClassName
              )}
            >
              {label}
              {rest.required && (
                <span className="text-red-500 ml-1" aria-label="required">
                  *
                </span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <div
              className={cn(
                "flex justify-between items-center gap-2 bg-grey-1 h-12 px-3 border border-black",
                containerClassName,
                fieldState.error && "border-red-500"
              )}
            >
              {append}
              <Input
                id={fieldId}
                className={cn(
                  "flex-1 py-4 placeholder:text-black/50 text-xs border-none shadow-none focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed",
                  inputClassName
                )}
                aria-invalid={fieldState.error ? "true" : "false"}
                aria-describedby={cn(
                  fieldState.error && errorId,
                  descriptionId && descriptionId
                )}
                {...field}
                {...rest}
              />
              {prepend}
            </div>
          </FormControl>
          {error && (
            <span
              id={errorId}
              className="text-red-500 text-xs mt-1 block"
              role="alert"
              aria-live="polite"
            >
              {error}
            </span>
          )}
          <FormMessage id={fieldState.error ? errorId : undefined} />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
