import { ActivityList } from "../ActivityList";
import type { Activity } from "@/lib/types";

// todo: remove mock functionality
const mockActivities: Activity[] = [
  { id: "1", bookTitle: "The Great Gatsby", action: "checkout", borrower: "John Smith", timestamp: "2024-12-07T14:30:00" },
  { id: "2", bookTitle: "1984", action: "return", borrower: "Jane Doe", timestamp: "2024-12-07T11:15:00" },
  { id: "3", bookTitle: "Pride and Prejudice", action: "checkout", borrower: "Bob Wilson", timestamp: "2024-12-06T16:45:00" },
];

export default function ActivityListExample() {
  return (
    <div className="p-6 max-w-md">
      <ActivityList activities={mockActivities} />
    </div>
  );
}
