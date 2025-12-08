import { useState } from "react";
import { CheckoutTable } from "@/components/CheckoutTable";
import { SearchInput } from "@/components/SearchInput";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCheckouts } from "@/lib/mockData";
import type { Checkout } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { isPast, parseISO } from "date-fns";

export default function Checkouts() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [returnCheckout, setReturnCheckout] = useState<Checkout | null>(null);
  const [extendCheckout, setExtendCheckout] = useState<Checkout | null>(null);

  // todo: remove mock functionality - use real data
  const [checkouts, setCheckouts] = useState(mockCheckouts);

  const activeCheckouts = checkouts.filter((c) => c.status === "active");
  const returnedCheckouts = checkouts.filter((c) => c.status === "returned");

  const filteredActive = activeCheckouts.filter(
    (c) =>
      search === "" ||
      c.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.borrower.toLowerCase().includes(search.toLowerCase())
  );

  const filteredReturned = returnedCheckouts.filter(
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

  const handleExtend = () => {
    if (extendCheckout) {
      // todo: remove mock functionality - call real API
      const newDueDate = new Date(extendCheckout.dueDate);
      newDueDate.setDate(newDueDate.getDate() + 7);
      setCheckouts(
        checkouts.map((c) =>
          c.id === extendCheckout.id ? { ...c, dueDate: newDueDate.toISOString().split("T")[0] } : c
        )
      );
      toast({
        title: "Due date extended",
        description: `New due date: ${newDueDate.toLocaleDateString()}`,
      });
      setExtendCheckout(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-medium" data-testid="text-page-title">Checkouts</h1>
        <p className="text-muted-foreground mt-1">Manage book checkouts and returns</p>
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by book title or borrower..."
        className="max-w-md"
      />

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active" data-testid="tab-active">
            Active ({activeCheckouts.length})
          </TabsTrigger>
          <TabsTrigger value="returned" data-testid="tab-returned">
            Returned ({returnedCheckouts.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <CheckoutTable
            checkouts={filteredActive}
            onReturn={setReturnCheckout}
            onExtend={setExtendCheckout}
          />
          {filteredActive.length === 0 && (
            <div className="text-center py-12 border rounded-md">
              <p className="text-muted-foreground">No active checkouts found</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="returned" className="mt-4">
          <CheckoutTable checkouts={filteredReturned} />
          {filteredReturned.length === 0 && (
            <div className="text-center py-12 border rounded-md">
              <p className="text-muted-foreground">No returned books found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={!!returnCheckout}
        onOpenChange={(open) => !open && setReturnCheckout(null)}
        title="Return Book"
        description={`Mark "${returnCheckout?.bookTitle}" as returned from ${returnCheckout?.borrower}?`}
        confirmText="Return Book"
        onConfirm={handleReturn}
      />

      <ConfirmDialog
        open={!!extendCheckout}
        onOpenChange={(open) => !open && setExtendCheckout(null)}
        title="Extend Due Date"
        description={`Extend the due date for "${extendCheckout?.bookTitle}" by 7 days?`}
        confirmText="Extend"
        onConfirm={handleExtend}
      />
    </div>
  );
}
