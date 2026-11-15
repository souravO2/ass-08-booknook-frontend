"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
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
  const { data: session, isPending } = useSession();
  const email = session?.user.email;

  const [borrows, setBorrows] = React.useState<Borrow[] | null>(null);
  const [failed, setFailed] = React.useState(false);

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
      }
    };

    fetchBorrows();
  }, [email]);

  if (isPending || (email && borrows === null && !failed)) {
    return (
      <main className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4">
        <Loader2 className="size-10 animate-spin text-forest" />
      </main>
    );
  }

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

      {!email || failed ? (
        <div className="rounded-[20px] border border-border bg-white p-8 text-center text-muted">
          {failed
            ? "Failed to load your borrowed books. Please try again."
            : "Please sign in to view your borrowed books."}
        </div>
      ) : !borrows?.length ? (
        <div className="rounded-[20px] border border-border bg-white p-8 text-center text-muted">
          You haven&apos;t borrowed any books yet.
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
