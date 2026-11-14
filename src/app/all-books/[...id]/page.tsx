import BorrowButton from "@/components/books/BorrowButton";
import { BookType } from "@/lib/Types/BookType";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BookDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all-books/${id}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) notFound();
  const book: BookType = await res.json();

  const addedOn = new Date(book.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 pb-24 md:px-8">
      <p className="mb-7 text-[15px] text-muted">
        <Link
          href="/all-books"
          className="font-bold text-forest hover:underline"
        >
          All Books
        </Link>{" "}
        / {book.title}
      </p>

      <div className="flex flex-col gap-10 md:flex-row md:gap-14">
        {/* Cover */}
        <div className="md:w-105 md:shrink-0">
          <Image
            src={book.bookImage}
            alt={book.title}
            width={300}
            height={400}
            className="h-160 w-full rounded-3xl bg-sand object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-4">
          <span className="self-start rounded-full bg-sand px-3.5 py-1 text-sm font-bold text-[#6B3A12]">
            {book.category}
          </span>
          <h1 className="font-heading text-4xl leading-tight font-bold text-ink md:text-5xl">
            {book.title}
          </h1>
          <p className="text-xl text-muted">by {book.author}</p>
          <p className="max-w-xl text-[17px] leading-relaxed text-ink">
            {book.description}
          </p>

          <dl className="max-w-xl rounded-2xl border border-border bg-white px-6 py-2">
            <div className="flex justify-between border-b border-[#E8DFCB] py-3.5">
              <dt className="text-muted">Added by</dt>
              <dd className="font-bold text-ink">
                {book.userName} ({book.userEmail})
              </dd>
            </div>
            <div className="flex justify-between border-b border-[#E8DFCB] py-3.5">
              <dt className="text-muted">Added on</dt>
              <dd className="font-bold text-ink">{addedOn}</dd>
            </div>
            <div className="flex justify-between py-3.5">
              <dt className="text-muted">Copies</dt>
              <dd
                className={`font-bold ${
                  Number(book.availableCopies) > 0
                    ? "text-forest"
                    : "text-error"
                }`}
              >
                {book.availableCopies} of {book.totalCopies} available
              </dd>
            </div>
          </dl>

          <div className="mt-1.5 flex flex-wrap gap-3">
            <BorrowButton book={book} />
            <Link
              href="/all-books"
              className="inline-flex h-12 items-center rounded-full border-[1.5px] border-forest px-6 font-bold text-forest transition-colors hover:bg-sand"
            >
              Back to All Books
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetailPage;
