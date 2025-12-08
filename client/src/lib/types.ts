export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publicationDate: string;
  quantity: number;
  available: number;
  description?: string;
}

export interface Checkout {
  id: string;
  bookId: string;
  bookTitle: string;
  borrower: string;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
  status: "active" | "returned" | "overdue";
}

export interface Activity {
  id: string;
  bookTitle: string;
  action: "checkout" | "return";
  borrower: string;
  timestamp: string;
}
