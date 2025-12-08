import { useState } from "react";
import { BookFormDialog } from "../BookFormDialog";
import { Button } from "@/components/ui/button";

export default function BookFormDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Add New Book</Button>
      <BookFormDialog
        open={open}
        onOpenChange={setOpen}
        onSave={(book) => console.log("Save book:", book)}
      />
    </div>
  );
}
