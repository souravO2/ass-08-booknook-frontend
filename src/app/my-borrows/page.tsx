"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import ReturnDialog from "@/components/books/ReturnDialog";
import { tokenFromClient } from "@/lib/tokenClient";

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const dueText = (d: string) => {
  const days = Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000);

  if (days > 1) return `Due in ${days} days`;
  if (days === 1) return "Due tomorrow";
  if (days === 0) return "Due today";

  return `Overdue by ${Math.abs(days)} day${days === -1 ? "" : "s"}`;
};

const dueColor = (d: string) =>
  new Date(d).getTime() < Date.now() ? "text-error" : "text-amber";

const MyBorrowsPage = () => {
  const { data: session } = useSession();
  const email = session?.user.email;

  const [borrows, setBorrows] = React.useState<Borrow[] | null>(null);
  const [failed, setFailed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!email) return;

    const fetchBorrows = async () => {
      try {
        const token = await tokenFromClient();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-borrows/${email}`,
          {
            cache: "no-store",
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) throw new Error();

        const data: Borrow[] = await res.json();
        setBorrows(data);
      } catch {
        setFailed(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [email]);

  return (
    <main className="mx-auto max-w-7xl min-h-[60vh] px-4 pt-8 pb-24 md:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-ink md:text-5xl">
          My Borrows
        </h1>
        <p className="mt-2.5 text-lg text-muted">
          Books you have on loan right now.
        </p>
      </div>

      {!email ? (
        <div className="rounded-[20px] border border-border bg-white p-8 text-center text-muted">
          Please sign in to view your borrowed books.
        </div>
      ) : loading ? (
        <div className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-[20px] border border-border bg-white p-8">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-sand border-t-forest" />

          <p className="text-sm font-medium text-muted">
            Loading your borrowed books...
          </p>
        </div>
      ) : failed ? (
        <div className="rounded-[20px] border border-border bg-white p-8 text-center text-muted">
          Failed to load your borrowed books. Please try again.
        </div>
      ) : !borrows?.length ? (
        <div className="flex flex-col items-center justify-center rounded-[20px] border border-border bg-white px-6 py-12 text-center">
          <p className="text-lg font-semibold text-ink">
            You haven&apos;t borrowed any books yet.
          </p>

          <p className="mt-2 text-sm text-muted">
            Explore our collection and find your next favorite book.
          </p>

          <Link
            href="/all-books"
            className="mt-6 rounded-xl bg-forest px-6 py-3 font-semibold text-white transition-colors hover:bg-forest/90"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto rounded-[20px] border border-border bg-white lg:block">
            <table className="w-full min-w-205 text-left">
              <thead className="bg-sand text-[13px] tracking-[0.08em] text-ink/70 uppercase">
                <tr>
                  <th className="px-6 py-4 font-bold">Cover</th>
                  <th className="px-6 py-4 font-bold">Title</th>
                  <th className="px-6 py-4 font-bold">Borrowed</th>
                  <th className="px-6 py-4 font-bold">Return By</th>
                  <th className="px-6 py-4 font-bold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {borrows.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b border-[#E8DFCB] last:border-0"
                  >
                    <td className="px-6 py-4">
                      <Image
                        src={b.bookImage}
                        alt={b.bookTitle}
                        width={300}
                        height={400}
                        className="h-16 w-12 rounded-md bg-sand object-cover"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href={`/all-books/${b.bookId}`}
                        className="font-heading text-lg font-bold text-ink hover:text-forest"
                      >
                        {b.bookTitle}
                      </Link>
                    </td>

                    <td className="px-6 py-4">{formatDate(b.borrowDate)}</td>

                    <td className="px-6 py-4">
                      {formatDate(b.returnDate)}
                      <p
                        className={`text-sm font-bold ${dueColor(b.returnDate)}`}
                      >
                        {dueText(b.returnDate)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <ReturnDialog
                        borrowId={b._id}
                        bookTitle={b.bookTitle}
                        onReturned={(id) =>
                          setBorrows(
                            (prev) =>
                              prev?.filter((item) => item._id !== id) ?? prev,
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile and Tablet Cards */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {borrows.map((b) => (
              <li
                key={b._id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-4"
              >
                <div className="flex gap-4">
                  <Image
                    src={b.bookImage}
                    alt={b.bookTitle}
                    width={300}
                    height={400}
                    className="h-28 w-20 shrink-0 rounded-lg bg-sand object-cover"
                  />

                  <div className="min-w-0">
                    <Link
                      href={`/all-books/${b.bookId}`}
                      className="line-clamp-2 font-heading text-lg leading-snug font-bold text-ink hover:text-forest"
                    >
                      {b.bookTitle}
                    </Link>

                    <p className="mt-2 text-sm text-muted">
                      Borrowed {formatDate(b.borrowDate)}
                    </p>

                    <p className="text-sm text-muted">
                      Return by {formatDate(b.returnDate)}
                    </p>

                    <p
                      className={`text-sm font-bold ${dueColor(b.returnDate)}`}
                    >
                      {dueText(b.returnDate)}
                    </p>
                  </div>
                </div>

                <ReturnDialog
                  borrowId={b._id}
                  bookTitle={b.bookTitle}
                  onReturned={(id) =>
                    setBorrows(
                      (prev) => prev?.filter((item) => item._id !== id) ?? prev,
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default MyBorrowsPage;
