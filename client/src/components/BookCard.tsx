import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { BookOpen } from "lucide-react";
import type { Book } from "@/lib/types";

interface BookCardProps {
  book: Book;
  onCheckout?: (book: Book) => void;
  onViewDetails?: (book: Book) => void;
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

export function BookCard({ book, onCheckout, onViewDetails }: BookCardProps) {
  const isAvailable = book.available > 0;
  const isLowStock = book.available > 0 && book.available <= 2;
  const bgColor = genreColors[book.genre] || "bg-muted";

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-book-${book.id}`}>
      <div className={`aspect-[2/3] relative ${bgColor} flex items-center justify-center`}>
        <BookOpen className="h-16 w-16 text-muted-foreground/50" />
        <div className="absolute top-2 right-2">
          {isLowStock ? (
            <StatusBadge status="low-stock" />
          ) : isAvailable ? (
            <StatusBadge status="available" />
          ) : (
            <StatusBadge status="checked-out" />
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-2 min-h-[2.5rem]" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
        <p className="text-xs text-muted-foreground mt-1 font-mono">{book.isbn}</p>
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails?.(book)}
            data-testid={`button-view-${book.id}`}
          >
            Details
          </Button>
          <Button
            size="sm"
            className="flex-1"
            disabled={!isAvailable}
            onClick={() => onCheckout?.(book)}
            data-testid={`button-checkout-${book.id}`}
          >
            Check Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
