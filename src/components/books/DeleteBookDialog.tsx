"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { BookType } from "@/lib/Types/BookType";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteBookDialog({ book }: { book: BookType }) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-books/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) {
        throw new Error("Failed to delete book");
      }
      toast.success(`Book successfully deleted`);
      setIsDeleteDialogOpen(false);
      router.replace("/my-books");
    } catch (error) {
      console.error("Failed to delete book:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={`h-9 cursor-pointer gap-1.5 rounded-full border-[1.5px] border-error bg-transparent px-4 text-sm font-bold text-error transition-colors hover:bg-error/10 hover:text-error`}
          />
        }
      >
        <Trash2 className="size-3.5" aria-hidden />
        Delete
      </DialogTrigger>

      <DialogContent className="max-w-md gap-4 rounded-[20px] border-border bg-white p-8">
        <DialogHeader className="gap-2">
          <DialogTitle className="font-heading text-2xl font-bold text-ink">
            Delete this book?
          </DialogTitle>
          <DialogDescription className="leading-relaxed text-muted">
            Are you sure you want to delete &quot;{book.title}&quot;? It will be
            removed from the shelf for good. This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
            className="h-12 flex-1 cursor-pointer rounded-full border-[1.5px] border-forest bg-transparent font-bold text-forest transition-colors hover:bg-sand hover:text-forest"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={() => handleDelete(book._id)}
            disabled={isDeleting}
            className="h-12 flex-1 cursor-pointer gap-2 rounded-full bg-error font-bold text-white transition-opacity hover:bg-error hover:opacity-90 disabled:opacity-60"
          >
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
