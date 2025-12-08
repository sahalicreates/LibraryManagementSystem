import { useState } from "react";
import { CheckoutDialog } from "../CheckoutDialog";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/types";

// todo: remove mock functionality
const mockBook: Book = {
  id: "1",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  isbn: "978-0743273565",
  genre: "Fiction",
  publicationDate: "1925-04-10",
  quantity: 5,
  available: 3,
};

export default function CheckoutDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Check Out Book</Button>
      <CheckoutDialog
        open={open}
        onOpenChange={setOpen}
        book={mockBook}
        onCheckout={(bookId, borrower, dueDate) => console.log("Checkout:", { bookId, borrower, dueDate })}
      />
    </div>
  );
}
