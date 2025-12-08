import { useState } from "react";
import { BookCard } from "@/components/BookCard";
import { SearchInput } from "@/components/SearchInput";
import { FilterChips } from "@/components/FilterChips";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { BookDetailsDialog } from "@/components/BookDetailsDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockBooks } from "@/lib/mockData";
import type { Book } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const genres = ["Fiction", "Non-Fiction", "Science", "History", "Biography", "Mystery", "Romance", "Fantasy"];

export default function BrowseBooks() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [checkoutBook, setCheckoutBook] = useState<Book | null>(null);
  const [detailsBook, setDetailsBook] = useState<Book | null>(null);

  // todo: remove mock functionality - use real data
  const [books, setBooks] = useState(mockBooks);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      search === "" ||
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.isbn.includes(search);

    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(book.genre);

    const matchesAvailability =
      availability === "all" ||
      (availability === "available" && book.available > 0) ||
      (availability === "checked-out" && book.available === 0);

    return matchesSearch && matchesGenre && matchesAvailability;
  });

  const handleCheckout = (bookId: string, borrower: string, dueDate: string) => {
    // todo: remove mock functionality - call real API
    setBooks(books.map((b) => (b.id === bookId ? { ...b, available: b.available - 1 } : b)));
    toast({
      title: "Book checked out",
      description: `Successfully checked out to ${borrower}`,
    });
    console.log("Checkout:", { bookId, borrower, dueDate });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-medium" data-testid="text-page-title">Browse Books</h1>
        <p className="text-muted-foreground mt-1">Explore our catalog and check out books</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput value={search} onChange={setSearch} className="flex-1 max-w-md" />
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="w-[180px]" data-testid="select-availability">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Books</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="checked-out">Checked Out</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <FilterChips label="Genre:" options={genres} selected={selectedGenres} onChange={setSelectedGenres} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onCheckout={setCheckoutBook}
            onViewDetails={setDetailsBook}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your criteria</p>
        </div>
      )}

      <CheckoutDialog
        open={!!checkoutBook}
        onOpenChange={(open) => !open && setCheckoutBook(null)}
        book={checkoutBook}
        onCheckout={handleCheckout}
      />

      <BookDetailsDialog
        open={!!detailsBook}
        onOpenChange={(open) => !open && setDetailsBook(null)}
        book={detailsBook}
        onCheckout={(book) => {
          setDetailsBook(null);
          setCheckoutBook(book);
        }}
      />
    </div>
  );
}
