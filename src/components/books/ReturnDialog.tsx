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
import { Loader2, Undo2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ReturnDialogProps = {
  borrowId: string;
  bookTitle: string;
  onReturned: (id: string) => void;
};

export default function ReturnDialog({
  borrowId,
  bookTitle,
  onReturned,
}: ReturnDialogProps) {
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const handleReturn = async () => {
    setIsReturning(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-borrows/${borrowId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        const { msg } = await res.json().catch(() => ({}));
        throw new Error(msg || "Failed to return book");
      }

      toast.success("Book returned successfully");
      onReturned(borrowId);
      setIsReturnDialogOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
      <DialogTrigger
        render={
          <Button
            variant="default"
            size="sm"
            className="h-9 cursor-pointer gap-1.5 rounded-full bg-forest px-4 text-sm font-bold text-white transition-colors hover:bg-forest-deep"
          />
        }
      >
        <Undo2 className="size-3.5" aria-hidden />
        Return Book
      </DialogTrigger>

      <DialogContent className="max-w-md gap-4 rounded-[20px] border-border bg-white p-8">
        <DialogHeader className="gap-2">
          <DialogTitle className="font-heading text-2xl font-bold text-ink">
            Return this book?
          </DialogTitle>

          <DialogDescription className="leading-relaxed text-muted">
            Are you sure you want to return &quot;{bookTitle}&quot;? It will be
            removed from your borrowed books and become available again.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsReturnDialogOpen(false)}
            disabled={isReturning}
            className="h-12 flex-1 cursor-pointer rounded-full border-[1.5px] border-forest bg-transparent font-bold text-forest transition-colors hover:bg-sand hover:text-forest"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleReturn}
            disabled={isReturning}
            className="h-12 flex-1 cursor-pointer gap-2 rounded-full bg-forest font-bold text-white transition-opacity hover:bg-forest-deep disabled:opacity-60"
          >
            {isReturning && <Loader2 className="size-4 animate-spin" />}
            {isReturning ? "Returning..." : "Confirm Return"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
