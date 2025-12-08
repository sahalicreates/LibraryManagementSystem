import { CheckoutTable } from "../CheckoutTable";
import type { Checkout } from "@/lib/types";

// todo: remove mock functionality
const mockCheckouts: Checkout[] = [
  { id: "1", bookId: "1", bookTitle: "The Great Gatsby", borrower: "John Smith", checkoutDate: "2024-11-20", dueDate: "2024-12-04", status: "active" },
  { id: "2", bookId: "2", bookTitle: "To Kill a Mockingbird", borrower: "Jane Doe", checkoutDate: "2024-11-01", dueDate: "2024-11-15", status: "active" },
  { id: "3", bookId: "3", bookTitle: "1984", borrower: "Bob Wilson", checkoutDate: "2024-10-15", dueDate: "2024-10-29", returnDate: "2024-10-28", status: "returned" },
];

export default function CheckoutTableExample() {
  return (
    <div className="p-6">
      <CheckoutTable
        checkouts={mockCheckouts}
        onReturn={(checkout) => console.log("Return:", checkout.bookTitle)}
        onExtend={(checkout) => console.log("Extend:", checkout.bookTitle)}
      />
    </div>
  );
}
