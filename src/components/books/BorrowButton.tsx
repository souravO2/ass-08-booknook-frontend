"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { BookType } from "@/lib/Types/BookType";
import { tokenFromClient } from "@/lib/tokenClient";

const LOAN_DAYS = 7; // keep this the same as the server

const fieldClasses =
  "block h-11 w-full rounded-[10px] border-[1.5px] border-[#CFC3AA] bg-sand/60 px-3.5 text-[15px] text-ink outline-none";

export default function BorrowButton({ book }: { book: BookType }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const unavailable = Number(book.availableCopies) <= 0;

  const handleOpen = () => {
    if (isPending) return;
    if (!session?.user) {
      toast.error("Please log in to borrow this book");
      router.push(`/signin?redirect=${`/all-books/${book._id}`}`);
      return;
    }
    setOpen(true);
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    const token = await tokenFromClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrow-book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookId: book._id,
            userEmail: session?.user.email,
          }),
        },
      );

      setOpen(false);

      if (!res.ok) {
        const { msg } = await res.json().catch(() => ({}));
        toast.error(msg || "Could not borrow the book");
        return;
      }

      toast.success("Book borrowed successfully");
      router.push("/my-borrows");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const returnDate = new Date(
    Date.now() + LOAN_DAYS * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={unavailable}
        className="h-12 rounded-full cursor-pointer bg-forest px-7 font-bold text-white transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:bg-[#CFC3AA] disabled:text-ink/60"
      >
        {unavailable ? "Not Available" : "Borrow This Book"}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-[20px] border-border bg-white p-8">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl font-bold text-ink">
              Borrow This Book
            </DialogTitle>
            <DialogDescription className="sr-only">
              Confirm that you want to borrow this book.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3.5 rounded-xl bg-paper p-3">
            <Image
              src={book.bookImage}
              width={300}
              height={400}
              alt={book.title}
              className="h-16 w-12 rounded-md bg-sand object-cover"
            />
            <div>
              <p className="font-heading text-lg leading-snug font-bold text-ink">
                {book.title}
              </p>
              <p className="text-sm text-muted">{book.author}</p>
            </div>
          </div>

          <div>
            <label htmlFor="borrowName" className="block text-sm font-bold">
              Your Name
            </label>
            <input
              id="borrowName"
              value={session?.user.name ?? ""}
              readOnly
              className={`${fieldClasses} mt-1.5`}
            />
          </div>

          <div>
            <label htmlFor="borrowEmail" className="block text-sm font-bold">
              Your Email
            </label>
            <input
              id="borrowEmail"
              value={session?.user.email ?? ""}
              readOnly
              className={`${fieldClasses} mt-1.5`}
            />
          </div>

          <p className="text-sm text-muted">
            Return date: {returnDate}, {LOAN_DAYS} days from today.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-12 flex-1 rounded-full border-[1.5px] border-forest font-bold text-forest transition-colors hover:bg-sand"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={submitting}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-forest font-bold text-white transition-colors hover:bg-forest-deep disabled:opacity-60"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? "Borrowing..." : "Confirm Borrow"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
