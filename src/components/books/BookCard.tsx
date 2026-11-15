import { BookType } from "@/lib/Types/BookType";
import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }: { book: BookType }) {
  return (
    <div className="group flex h-full flex-col gap-2 overflow-hidden rounded-2xl border border-border bg-white p-2 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-forest/30 hover:shadow-xl">
      {/* Book Image */}
      <div className="overflow-hidden rounded-[10px]">
        <Image
          src={book.bookImage}
          alt={book.title}
          width={300}
          height={400}
          className="h-100 w-full bg-sand object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Book Info */}
      <h3 className="mt-1.5 line-clamp-2 min-h-12 font-heading text-xl leading-snug font-bold text-ink transition-colors duration-300 group-hover:text-forest">
        {book.title}
      </h3>

      <p className="text-[15px] text-muted">{book.author}</p>

      {/* Category */}
      <span className="self-start rounded-full bg-sand px-3 py-1 text-[13px] font-bold text-[#6B3A12] transition-colors duration-300 group-hover:bg-[#EADCC5]">
        {book.category}
      </span>

      {/* Button */}
      <Link
        href={`/all-books/${book._id}`}
        className="mt-auto block rounded-full bg-forest py-3 text-center font-bold text-white transition-all duration-300 ease-in-out hover:bg-forest-deep hover:shadow-md active:scale-[0.98]"
      >
        View Details
      </Link>
    </div>
  );
}
