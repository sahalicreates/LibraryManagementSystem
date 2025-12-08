import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Edit, Trash2 } from "lucide-react";
import type { Book } from "@/lib/types";

interface BookTableProps {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

export function BookTable({ books, onEdit, onDelete }: BookTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">Title</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">Author</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide font-mono">ISBN</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">Genre</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide text-center">Qty</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">Status</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book, index) => {
            const isAvailable = book.available > 0;
            const isLowStock = book.available > 0 && book.available <= 2;
            return (
              <TableRow key={book.id} className={index % 2 === 0 ? "bg-muted/30" : ""} data-testid={`row-book-${book.id}`}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell className="text-center">{book.available}/{book.quantity}</TableCell>
                <TableCell>
                  {isLowStock ? (
                    <StatusBadge status="low-stock" />
                  ) : isAvailable ? (
                    <StatusBadge status="available" />
                  ) : (
                    <StatusBadge status="checked-out" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => onEdit?.(book)} data-testid={`button-edit-${book.id}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => onDelete?.(book)} data-testid={`button-delete-${book.id}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
