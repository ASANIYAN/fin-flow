import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface DashboardProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number | null;
}

function DashboardProgress({
  className,
  value,
  ...props
}: DashboardProgressProps) {
  const getProgressStyles = (value: number | null | undefined) => {
    if (!value || value === null) {
      return {
        background: "bg-red-100",
        indicator: "bg-red-500",
      };
    }

    if (value < 35) {
      return {
        background: "bg-red-100",
        indicator: "bg-red-500",
      };
    }

    if (value >= 35 && value < 70) {
      return {
        background: "bg-yellow-100",
        indicator: "bg-yellow-500",
      };
    }

    if (value >= 70 && value < 100) {
      return {
        background: "bg-green-100",
        indicator: "bg-green-500",
      };
    }

    return {
      background: "bg-blue-100",
      indicator: "bg-brand-primary",
    };
  };

  const styles = getProgressStyles(value);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        styles.background,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full w-full flex-1 transition-all", styles.indicator)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { DashboardProgress };
