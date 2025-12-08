import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { BookOpen } from "lucide-react";
import type { Book } from "@/lib/types";
import { format, parseISO } from "date-fns";

interface BookDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book | null;
  onCheckout?: (book: Book) => void;
}

const genreColors: Record<string, string> = {
  "Fiction": "bg-blue-100 dark:bg-blue-900",
  "Non-Fiction": "bg-green-100 dark:bg-green-900",
  "Science": "bg-purple-100 dark:bg-purple-900",
  "History": "bg-amber-100 dark:bg-amber-900",
  "Biography": "bg-pink-100 dark:bg-pink-900",
  "Mystery": "bg-slate-100 dark:bg-slate-800",
  "Romance": "bg-rose-100 dark:bg-rose-900",
  "Fantasy": "bg-indigo-100 dark:bg-indigo-900",
};

export function BookDetailsDialog({ open, onOpenChange, book, onCheckout }: BookDetailsDialogProps) {
  if (!book) return null;

  const isAvailable = book.available > 0;
  const isLowStock = book.available > 0 && book.available <= 2;
  const bgColor = genreColors[book.genre] || "bg-muted";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className={`aspect-video rounded-md ${bgColor} flex items-center justify-center`}>
            <BookOpen className="h-20 w-20 text-muted-foreground/50" />
          </div>
          <div>
            <h2 className="text-xl font-medium">{book.title}</h2>
            <p className="text-muted-foreground">{book.author}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {isLowStock ? (
              <StatusBadge status="low-stock" />
            ) : isAvailable ? (
              <StatusBadge status="available" />
            ) : (
              <StatusBadge status="checked-out" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">ISBN</p>
              <p className="font-mono">{book.isbn}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Genre</p>
              <p>{book.genre}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Published</p>
              <p>{format(parseISO(book.publicationDate), "MMMM d, yyyy")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Available Copies</p>
              <p>{book.available} of {book.quantity}</p>
            </div>
          </div>
          {book.description && (
            <div>
              <p className="text-muted-foreground text-sm mb-1">Description</p>
              <p className="text-sm">{book.description}</p>
            </div>
          )}
          <Button
            className="w-full"
            disabled={!isAvailable}
            onClick={() => {
              onCheckout?.(book);
              onOpenChange(false);
            }}
            data-testid="button-checkout-details"
          >
            {isAvailable ? "Check Out This Book" : "Not Available"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
