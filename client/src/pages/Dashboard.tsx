import { StatsCard } from "@/components/StatsCard";
import { ActivityList } from "@/components/ActivityList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BookCheck, AlertTriangle, Users } from "lucide-react";
import { mockBooks, mockCheckouts, mockActivities } from "@/lib/mockData";

export default function Dashboard() {
  // todo: remove mock functionality - calculate from real data
  const totalBooks = mockBooks.reduce((sum, b) => sum + b.quantity, 0);
  const checkedOut = mockCheckouts.filter((c) => c.status === "active").length;
  const overdue = mockCheckouts.filter((c) => c.status === "active" && new Date(c.dueDate) < new Date()).length;
  const uniqueBorrowers = new Set(mockCheckouts.filter((c) => c.status === "active").map((c) => c.borrower)).size;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-medium" data-testid="text-page-title">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your library</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Books" value={totalBooks} icon={BookOpen} description="In catalog" />
        <StatsCard title="Checked Out" value={checkedOut} icon={BookCheck} description="Currently borrowed" />
        <StatsCard title="Overdue" value={overdue} icon={AlertTriangle} description="Need attention" />
        <StatsCard title="Active Borrowers" value={uniqueBorrowers} icon={Users} description="This month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityList activities={mockActivities.slice(0, 6)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4 p-3 rounded-md bg-muted/50">
              <span className="text-sm">Books available for checkout</span>
              <span className="font-medium">{mockBooks.filter((b) => b.available > 0).length}</span>
            </div>
            <div className="flex items-center justify-between gap-4 p-3 rounded-md bg-muted/50">
              <span className="text-sm">Low stock items</span>
              <span className="font-medium">{mockBooks.filter((b) => b.available > 0 && b.available <= 2).length}</span>
            </div>
            <div className="flex items-center justify-between gap-4 p-3 rounded-md bg-muted/50">
              <span className="text-sm">Unique titles</span>
              <span className="font-medium">{mockBooks.length}</span>
            </div>
            <div className="flex items-center justify-between gap-4 p-3 rounded-md bg-muted/50">
              <span className="text-sm">Most popular genre</span>
              <span className="font-medium">Fiction</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
