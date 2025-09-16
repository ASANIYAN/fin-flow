import type { Control } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type CustomTextAreaProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  teaxtareaClassName?: string;
  formLabelClassName?: string;
};

const CustomTextArea: React.FC<
  CustomTextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({
  name,
  label,
  control,
  teaxtareaClassName,
  formLabelClassName,
  ...rest
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel
            className={cn(
              "text-black/70 text-base leading-5",
              formLabelClassName
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              className={cn(
                "flex-1 py-4 placeholder:text-black/50 text-xs shadow-none focus-visible:ring-0 focus-visible:outline-none resize-none",
                teaxtareaClassName
              )}
              rows={4}
              {...field}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomTextArea;
