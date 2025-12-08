import { RotateCcw, ArrowRight } from "lucide-react";
import type { Activity } from "@/lib/types";
import { formatDistanceToNow, parseISO } from "date-fns";

interface ActivityListProps {
  activities: Activity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center gap-3 p-3 rounded-md bg-muted/50"
          data-testid={`activity-${activity.id}`}
        >
          <div className={`p-2 rounded-md ${activity.action === "checkout" ? "bg-primary/10" : "bg-green-100 dark:bg-green-900"}`}>
            {activity.action === "checkout" ? (
              <ArrowRight className="h-4 w-4 text-primary" />
            ) : (
              <RotateCcw className="h-4 w-4 text-green-600 dark:text-green-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{activity.bookTitle}</p>
            <p className="text-xs text-muted-foreground">
              {activity.action === "checkout" ? "Checked out by" : "Returned by"} {activity.borrower}
            </p>
          </div>
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(parseISO(activity.timestamp), { addSuffix: true })}
          </p>
        </div>
      ))}
    </div>
  );
}
