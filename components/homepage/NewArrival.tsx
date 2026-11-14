// components/home/NewArrival.tsx
import Link from "next/link";
import { BookType } from "@/lib/Types/BookType";
import BookCard from "../books/BookCard";

const getNewBooks = async (): Promise<BookType[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/new-arrivals`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

const NewArrival = async () => {
  const books = await getNewBooks();

  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 md:px-8 md:pt-20">
      <div className="mb-8">
        <p className="text-[13px] font-bold tracking-[0.14em] text-amber">
          JUST ON THE SHELF
        </p>
        <h2 className="mt-2 font-heading text-3xl leading-tight font-bold text-ink md:text-[40px]">
          New Arrivals
        </h2>
      </div>

      {books === null ? (
        <p className="rounded-2xl bg-sand p-8 text-center text-ink">
          We couldn&apos;t load the new arrivals right now. Please try again in
          a moment.
        </p>
      ) : books.length === 0 ? (
        <p className="rounded-2xl bg-sand p-8 text-center text-ink">
          No books on the shelf yet. Be the first to add one.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/all-books"
          className="inline-flex h-12 items-center rounded-full border-[1.5px] border-forest px-7 font-bold text-forest transition-colors hover:bg-sand"
        >
          See All Books
        </Link>
      </div>
    </section>
  );
};

export default NewArrival;
