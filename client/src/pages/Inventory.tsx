import { useState } from "react";
import { BookTable } from "@/components/BookTable";
import { BookFormDialog } from "@/components/BookFormDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { SearchInput } from "@/components/SearchInput";
import { FilterChips } from "@/components/FilterChips";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockBooks } from "@/lib/mockData";
import type { Book } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const genres = ["Fiction", "Non-Fiction", "Science", "History", "Biography", "Mystery", "Romance", "Fantasy"];

export default function Inventory() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);

  // todo: remove mock functionality - use real data
  const [books, setBooks] = useState(mockBooks);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      search === "" ||
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.isbn.includes(search);

    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(book.genre);

    return matchesSearch && matchesGenre;
  });

  const handleSave = (bookData: Partial<Book>) => {
    // todo: remove mock functionality - call real API
    if (bookData.id) {
      setBooks(books.map((b) => (b.id === bookData.id ? { ...b, ...bookData } as Book : b)));
      toast({ title: "Book updated", description: `${bookData.title} has been updated` });
    } else {
      const newBook: Book = {
        ...bookData as Omit<Book, 'id' | 'available'>,
        id: Date.now().toString(),
        available: bookData.quantity || 1,
      };
      setBooks([...books, newBook]);
      toast({ title: "Book added", description: `${bookData.title} has been added to the catalog` });
    }
    setEditBook(null);
  };

  const handleDelete = () => {
    if (deleteBook) {
      // todo: remove mock functionality - call real API
      setBooks(books.filter((b) => b.id !== deleteBook.id));
      toast({ title: "Book removed", description: `${deleteBook.title} has been removed from the catalog` });
      setDeleteBook(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium" data-testid="text-page-title">Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage your book catalog</p>
        </div>
        <Button onClick={() => setFormOpen(true)} data-testid="button-add-book">
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>

      <div className="space-y-4">
        <SearchInput value={search} onChange={setSearch} className="max-w-md" />
        <FilterChips label="Genre:" options={genres} selected={selectedGenres} onChange={setSelectedGenres} />
      </div>

      <BookTable
        books={filteredBooks}
        onEdit={(book) => {
          setEditBook(book);
          setFormOpen(true);
        }}
        onDelete={setDeleteBook}
      />

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 border rounded-md">
          <p className="text-muted-foreground">No books found matching your criteria</p>
        </div>
      )}

      <BookFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditBook(null);
        }}
        book={editBook}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteBook}
        onOpenChange={(open) => !open && setDeleteBook(null)}
        title="Delete Book"
        description={`Are you sure you want to remove "${deleteBook?.title}" from the catalog? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
