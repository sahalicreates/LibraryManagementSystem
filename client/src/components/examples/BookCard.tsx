import { BookCard } from "../BookCard";
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

export default function BookCardExample() {
  return (
    <div className="p-6 max-w-xs">
      <BookCard
        book={mockBook}
        onCheckout={(book) => console.log("Checkout:", book.title)}
        onViewDetails={(book) => console.log("View details:", book.title)}
      />
    </div>
  );
}
