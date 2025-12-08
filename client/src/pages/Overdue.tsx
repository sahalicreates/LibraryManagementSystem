import { useState } from "react";
import { CheckoutTable } from "@/components/CheckoutTable";
import { SearchInput } from "@/components/SearchInput";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { mockCheckouts } from "@/lib/mockData";
import type { Checkout } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { isPast, parseISO, differenceInDays } from "date-fns";

export default function Overdue() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [returnCheckout, setReturnCheckout] = useState<Checkout | null>(null);

  // todo: remove mock functionality - use real data
  const [checkouts, setCheckouts] = useState(mockCheckouts);

  const overdueCheckouts = checkouts.filter(
    (c) => c.status === "active" && isPast(parseISO(c.dueDate))
  );

  const filteredOverdue = overdueCheckouts.filter(
    (c) =>
      search === "" ||
      c.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.borrower.toLowerCase().includes(search.toLowerCase())
  );

  const handleReturn = () => {
    if (returnCheckout) {
      // todo: remove mock functionality - call real API
      setCheckouts(
        checkouts.map((c) =>
          c.id === returnCheckout.id ? { ...c, status: "returned" as const, returnDate: new Date().toISOString().split("T")[0] } : c
        )
      );
      toast({
        title: "Book returned",
        description: `${returnCheckout.bookTitle} has been returned`,
      });
      setReturnCheckout(null);
    }
  };

  const totalDaysOverdue = overdueCheckouts.reduce((sum, c) => {
    return sum + differenceInDays(new Date(), parseISO(c.dueDate));
  }, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-medium" data-testid="text-page-title">Overdue Items</h1>
        <p className="text-muted-foreground mt-1">Books that need to be returned</p>
      </div>

      {overdueCheckouts.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg text-destructive">Attention Required</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              <span className="font-medium">{overdueCheckouts.length}</span> book(s) are overdue, totaling{" "}
              <span className="font-medium">{totalDaysOverdue}</span> days past due date.
            </p>
          </CardContent>
        </Card>
      )}

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by book title or borrower..."
        className="max-w-md"
      />

      {filteredOverdue.length > 0 ? (
        <CheckoutTable checkouts={filteredOverdue} onReturn={setReturnCheckout} />
      ) : (
        <div className="text-center py-12 border rounded-md">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {search ? "No overdue items match your search" : "No overdue items. Great job!"}
          </p>
        </div>
      )}

      <ConfirmDialog
        open={!!returnCheckout}
        onOpenChange={(open) => !open && setReturnCheckout(null)}
        title="Return Overdue Book"
        description={`Mark "${returnCheckout?.bookTitle}" as returned from ${returnCheckout?.borrower}?`}
        confirmText="Return Book"
        onConfirm={handleReturn}
      />
    </div>
  );
}
