import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";

interface StatusCardProps {
  title: string;
  value: number | string;
  icon: string;
  color?: "primary" | "success" | "warning" | "error";
  description?: string;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  color = "primary",
  description,
  className = "",
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "success":
        return "text-brand-primary bg-brand-primary/20";
      case "warning":
        return "text-brand-primary bg-brand-primary/30";
      case "error":
        return "text-brand-primary bg-brand-primary/40";
      default:
        return "text-brand-primary bg-brand-primary/10";
    }
  };

  return (
    <Card
      className={`hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[--color-text-secondary]">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-md ${getColorClasses(color)}`}>
          <Icon icon={icon} width={20} height={20} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-brand-primary">
          {typeof value === "number" && value > 999
            ? `₦${(value / 1000).toFixed(1)}k`
            : typeof value === "number" &&
              title.toLowerCase().includes("amount")
            ? `₦${value.toLocaleString()}`
            : value}
        </div>
        {description && (
          <p className="text-xs text-[--color-text-secondary] mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
