import { useState } from "react";
import { BookDetailsDialog } from "../BookDetailsDialog";
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
  description: "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
};

export default function BookDetailsDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>View Book Details</Button>
      <BookDetailsDialog
        open={open}
        onOpenChange={setOpen}
        book={mockBook}
        onCheckout={(book) => console.log("Checkout:", book.title)}
      />
    </div>
  );
}
