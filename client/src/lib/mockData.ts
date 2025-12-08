// todo: remove mock functionality - this entire file should be replaced with real API calls
import type { Book, Checkout, Activity } from "./types";

export const mockBooks: Book[] = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", genre: "Fiction", publicationDate: "1925-04-10", quantity: 5, available: 3, description: "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan." },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0061120084", genre: "Fiction", publicationDate: "1960-07-11", quantity: 3, available: 0, description: "The story of racial injustice and the loss of innocence in the American South." },
  { id: "3", title: "A Brief History of Time", author: "Stephen Hawking", isbn: "978-0553380163", genre: "Science", publicationDate: "1988-04-01", quantity: 2, available: 1, description: "A landmark volume in science writing by one of the great minds of our time." },
  { id: "4", title: "1984", author: "George Orwell", isbn: "978-0451524935", genre: "Fiction", publicationDate: "1949-06-08", quantity: 4, available: 2, description: "A dystopian novel about totalitarianism and surveillance." },
  { id: "5", title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0141439518", genre: "Romance", publicationDate: "1813-01-28", quantity: 3, available: 3, description: "A romantic novel of manners set in Georgian England." },
  { id: "6", title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "978-0316769488", genre: "Fiction", publicationDate: "1951-07-16", quantity: 2, available: 1 },
  { id: "7", title: "The Da Vinci Code", author: "Dan Brown", isbn: "978-0307474278", genre: "Mystery", publicationDate: "2003-03-18", quantity: 4, available: 4, description: "A mystery thriller novel that follows symbologist Robert Langdon." },
  { id: "8", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0547928227", genre: "Fantasy", publicationDate: "1937-09-21", quantity: 3, available: 2, description: "The adventure of Bilbo Baggins to the Lonely Mountain." },
  { id: "9", title: "Steve Jobs", author: "Walter Isaacson", isbn: "978-1451648539", genre: "Biography", publicationDate: "2011-10-24", quantity: 2, available: 2, description: "The authorized biography of the Apple co-founder." },
  { id: "10", title: "Sapiens", author: "Yuval Noah Harari", isbn: "978-0062316097", genre: "History", publicationDate: "2014-02-10", quantity: 3, available: 1, description: "A brief history of humankind." },
  { id: "11", title: "The Silent Patient", author: "Alex Michaelides", isbn: "978-1250301697", genre: "Mystery", publicationDate: "2019-02-05", quantity: 2, available: 0 },
  { id: "12", title: "Dune", author: "Frank Herbert", isbn: "978-0441172719", genre: "Science", publicationDate: "1965-08-01", quantity: 3, available: 2, description: "A science fiction masterpiece about politics, religion, and ecology." },
];

export const mockCheckouts: Checkout[] = [
  { id: "1", bookId: "1", bookTitle: "The Great Gatsby", borrower: "John Smith", checkoutDate: "2024-11-20", dueDate: "2024-12-04", status: "active" },
  { id: "2", bookId: "2", bookTitle: "To Kill a Mockingbird", borrower: "Jane Doe", checkoutDate: "2024-11-01", dueDate: "2024-11-15", status: "active" },
  { id: "3", bookId: "3", bookTitle: "1984", borrower: "Bob Wilson", checkoutDate: "2024-10-15", dueDate: "2024-10-29", returnDate: "2024-10-28", status: "returned" },
  { id: "4", bookId: "2", bookTitle: "To Kill a Mockingbird", borrower: "Alice Brown", checkoutDate: "2024-11-10", dueDate: "2024-11-24", status: "active" },
  { id: "5", bookId: "6", bookTitle: "The Catcher in the Rye", borrower: "Charlie Davis", checkoutDate: "2024-11-25", dueDate: "2024-12-09", status: "active" },
  { id: "6", bookId: "11", bookTitle: "The Silent Patient", borrower: "Eve Johnson", checkoutDate: "2024-10-20", dueDate: "2024-11-03", status: "active" },
  { id: "7", bookId: "11", bookTitle: "The Silent Patient", borrower: "Frank Miller", checkoutDate: "2024-10-18", dueDate: "2024-11-01", status: "active" },
  { id: "8", bookId: "2", bookTitle: "To Kill a Mockingbird", borrower: "Grace Lee", checkoutDate: "2024-11-05", dueDate: "2024-11-19", status: "active" },
];

export const mockActivities: Activity[] = [
  { id: "1", bookTitle: "The Great Gatsby", action: "checkout", borrower: "John Smith", timestamp: "2024-12-07T14:30:00" },
  { id: "2", bookTitle: "1984", action: "return", borrower: "Bob Wilson", timestamp: "2024-12-07T11:15:00" },
  { id: "3", bookTitle: "Pride and Prejudice", action: "checkout", borrower: "Sarah Connor", timestamp: "2024-12-06T16:45:00" },
  { id: "4", bookTitle: "The Hobbit", action: "checkout", borrower: "Tom Hardy", timestamp: "2024-12-06T10:20:00" },
  { id: "5", bookTitle: "Sapiens", action: "return", borrower: "Lisa Wong", timestamp: "2024-12-05T15:30:00" },
  { id: "6", bookTitle: "The Da Vinci Code", action: "checkout", borrower: "Mike Ross", timestamp: "2024-12-05T09:00:00" },
  { id: "7", bookTitle: "Dune", action: "return", borrower: "Anna Bell", timestamp: "2024-12-04T14:15:00" },
  { id: "8", bookTitle: "Steve Jobs", action: "checkout", borrower: "James Kirk", timestamp: "2024-12-04T11:45:00" },
];
