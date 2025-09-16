import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { type Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface CustomPasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  inputClassName?: string;
  containerClassName?: string;
  formLabelClassName?: string;
}

const CustomPasswordInput: React.FC<
  CustomPasswordInputProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
> = ({
  name,
  label,
  control,
  inputClassName,
  formLabelClassName,
  containerClassName,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel
            className={cn(
              "text-black/70 text-base leading-5",
              formLabelClassName
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <div
              className={cn(
                "relative flex items-center justify-between bg-grey-1 h-12 px-3 border border-black",
                containerClassName
              )}
            >
              <Input
                type={showPassword ? "text" : "password"}
                className={cn(
                  "flex-1 py-4 placeholder:text-black/50 text-xs border-none shadow-none focus-visible:ring-0 focus:ring-0 focus-visible:outline-none",
                  inputClassName
                )}
                {...field}
                {...rest}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff color="var(--color-black)" size={16} />
                ) : (
                  <Eye color="var(--color-black)" size={16} />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomPasswordInput;
