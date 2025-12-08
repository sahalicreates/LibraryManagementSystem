import { useState } from "react";
import { ConfirmDialog } from "../ConfirmDialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete Book</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Book"
        description="Are you sure you want to delete this book? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onConfirm={() => console.log("Deleted!")}
      />
    </div>
  );
}
