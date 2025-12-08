import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { RotateCcw, CalendarPlus } from "lucide-react";
import type { Checkout } from "@/lib/types";
import { format, isPast, parseISO } from "date-fns";

interface CheckoutTableProps {
  checkouts: Checkout[];
  onReturn?: (checkout: Checkout) => void;
  onExtend?: (checkout: Checkout) => void;
}

export function CheckoutTable({ checkouts, onReturn, onExtend }: CheckoutTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">Book Title</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">Borrower</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">Checkout Date</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">Due Date</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">Status</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checkouts.map((checkout, index) => {
            const isOverdue = checkout.status === "active" && isPast(parseISO(checkout.dueDate));
            return (
              <TableRow key={checkout.id} className={index % 2 === 0 ? "bg-muted/30" : ""} data-testid={`row-checkout-${checkout.id}`}>
                <TableCell className="font-medium">{checkout.bookTitle}</TableCell>
                <TableCell>{checkout.borrower}</TableCell>
                <TableCell className="font-mono text-sm">{format(parseISO(checkout.checkoutDate), "MMM d, yyyy")}</TableCell>
                <TableCell className={`font-mono text-sm ${isOverdue ? "text-destructive font-medium" : ""}`}>
                  {format(parseISO(checkout.dueDate), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  {checkout.status === "returned" ? (
                    <StatusBadge status="available" />
                  ) : isOverdue ? (
                    <StatusBadge status="overdue" />
                  ) : (
                    <StatusBadge status="checked-out" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {checkout.status === "active" && (
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => onExtend?.(checkout)} data-testid={`button-extend-${checkout.id}`}>
                        <CalendarPlus className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => onReturn?.(checkout)} data-testid={`button-return-${checkout.id}`}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
