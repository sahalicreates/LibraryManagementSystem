import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { Book } from "@/lib/types";
import { format, addDays } from "date-fns";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book | null;
  onCheckout: (bookId: string, borrower: string, dueDate: string) => void;
}

export function CheckoutDialog({ open, onOpenChange, book, onCheckout }: CheckoutDialogProps) {
  const [borrower, setBorrower] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (open) {
      setBorrower("");
      setDueDate(format(addDays(new Date(), 14), "yyyy-MM-dd"));
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (book) {
      onCheckout(book.id, borrower, dueDate);
      onOpenChange(false);
    }
  };

  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Check Out Book</DialogTitle>
          <DialogDescription>
            Checking out: <span className="font-medium">{book.title}</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="borrower">Borrower Name</Label>
            <Input
              id="borrower"
              value={borrower}
              onChange={(e) => setBorrower(e.target.value)}
              placeholder="Enter borrower's name"
              required
              data-testid="input-borrower"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              data-testid="input-due-date"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-checkout">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-confirm-checkout">
              Confirm Checkout
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
