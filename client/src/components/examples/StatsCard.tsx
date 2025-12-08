import { StatsCard } from "../StatsCard";
import { BookOpen, BookCheck, AlertTriangle } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <StatsCard
        title="Total Books"
        value={1247}
        icon={BookOpen}
        description="In catalog"
      />
      <StatsCard
        title="Checked Out"
        value={89}
        icon={BookCheck}
        description="Currently borrowed"
      />
      <StatsCard
        title="Overdue"
        value={12}
        icon={AlertTriangle}
        description="Need attention"
      />
    </div>
  );
}
