import { BookType } from "@/lib/Types/BookType";
import Link from "next/link";

export default function BookCard({ book }: { book: BookType }) {
  return (
    <div className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-white p-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.bookImage}
        alt={book.title}
        className="h-100 w-full rounded-[10px] bg-sand object-cover"
      />
      <h3 className="mt-1.5 line-clamp-2 min-h-12 font-heading text-xl leading-snug font-bold text-ink">
        {book.title}
      </h3>
      <p className="text-[15px] text-muted">{book.author}</p>
      <span className="self-start rounded-full bg-sand px-3 py-1 text-[13px] font-bold text-[#6B3A12]">
        {book.category}
      </span>
      <Link
        href={`/books/${book._id}`}
        className="mt-auto block rounded-full bg-forest py-3 text-center font-bold text-white transition-colors hover:bg-forest-deep"
      >
        View Details
      </Link>
    </div>
  );
}
