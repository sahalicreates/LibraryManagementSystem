import { BookTable } from "../BookTable";
import type { Book } from "@/lib/types";

// todo: remove mock functionality
const mockBooks: Book[] = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", genre: "Fiction", publicationDate: "1925-04-10", quantity: 5, available: 3 },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0061120084", genre: "Fiction", publicationDate: "1960-07-11", quantity: 3, available: 0 },
  { id: "3", title: "A Brief History of Time", author: "Stephen Hawking", isbn: "978-0553380163", genre: "Science", publicationDate: "1988-04-01", quantity: 2, available: 1 },
];

export default function BookTableExample() {
  return (
    <div className="p-6">
      <BookTable
        books={mockBooks}
        onEdit={(book) => console.log("Edit:", book.title)}
        onDelete={(book) => console.log("Delete:", book.title)}
      />
    </div>
  );
}
