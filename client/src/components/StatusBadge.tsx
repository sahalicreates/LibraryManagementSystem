import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Package } from "lucide-react";

type StatusType = "available" | "checked-out" | "overdue" | "low-stock";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof CheckCircle }> = {
  "available": { label: "Available", variant: "outline", icon: CheckCircle },
  "checked-out": { label: "Checked Out", variant: "secondary", icon: Clock },
  "overdue": { label: "Overdue", variant: "destructive", icon: AlertTriangle },
  "low-stock": { label: "Low Stock", variant: "outline", icon: Package },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className={`gap-1 ${status === "available" ? "text-green-600 border-green-600 dark:text-green-400 dark:border-green-400" : ""} ${status === "low-stock" ? "text-orange-600 border-orange-600 dark:text-orange-400 dark:border-orange-400" : ""} ${className || ""}`}
      data-testid={`badge-status-${status}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
