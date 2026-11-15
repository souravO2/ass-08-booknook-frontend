import DeleteBookDialog from "@/components/books/DeleteBookDialog";
import EditBookDialog from "@/components/books/EditBookDialog";
import { auth } from "@/lib/auth";
import { tokenFromServer } from "@/lib/tokenServer";
import { BookType } from "@/lib/Types/BookType";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user.email;

  let mybooks: BookType[] = [];
  let failed = false;

  if (email) {
    const token = await tokenFromServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-books/${email}`,
        {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch books");

      mybooks = await res.json();
    } catch {
      failed = true;
    }
  }

  return (
    <main className="mx-auto max-w-7xl min-h-[60vh] px-4 pt-8 pb-24 md:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl font-bold text-ink md:text-5xl">
            My Books
          </h1>
          <p className="mt-2.5 text-lg text-muted">
            Books you added to the shelf.
          </p>
        </div>

        {email && (
          <Link
            href="/add-book"
            className="inline-flex h-12 items-center rounded-full bg-forest px-6 font-bold text-white transition-colors hover:bg-forest-deep"
          >
            Add Book
          </Link>
        )}
      </div>

      {!email || failed ? (
        <div className="rounded-[20px] border border-border bg-white p-8 text-center text-muted">
          {failed
            ? "Failed to load your books. Please try again."
            : "Please sign in to view your books."}
        </div>
      ) : !mybooks.length ? (
        <div className="rounded-[20px] border border-border bg-white p-8 text-center text-muted">
          You haven&apos;t added any books yet.
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
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Copies</th>
                  <th className="px-6 py-4 font-bold">Added</th>
                  <th className="px-6 py-4 font-bold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {mybooks.map((book) => (
                  <tr
                    key={book._id}
                    className="border-b border-[#E8DFCB] last:border-0"
                  >
                    <td className="px-6 py-4">
                      <Image
                        src={book.bookImage}
                        alt={book.title}
                        width={300}
                        height={400}
                        className="h-16 w-12 rounded-md bg-sand object-cover"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href={`/all-books/${book._id}`}
                        className="font-heading text-lg font-bold text-ink hover:text-forest"
                      >
                        {book.title}
                        <p className="text-sm text-muted">{book.author}</p>
                      </Link>
                    </td>

                    <td className="px-6 py-4">{book.category}</td>

                    <td className="px-6 py-4">
                      {book.availableCopies} of {book.totalCopies}
                    </td>

                    <td className="px-6 py-4">{formatDate(book.createdAt)}</td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <EditBookDialog book={book} />
                        <DeleteBookDialog book={book} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile and Tablet Cards */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {mybooks.map((book) => (
              <li
                key={book._id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-4"
              >
                <div className="flex gap-4">
                  <Image
                    src={book.bookImage}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="h-28 w-20 shrink-0 rounded-lg bg-sand object-cover"
                  />

                  <div className="min-w-0">
                    <Link
                      href={`/all-books/${book._id}`}
                      className="line-clamp-2 font-heading text-lg leading-snug font-bold text-ink hover:text-forest"
                    >
                      {book.title}
                    </Link>

                    <p className="text-sm text-muted">{book.author}</p>

                    <span className="mt-2 inline-block rounded-full bg-sand px-3 py-0.5 text-xs font-bold text-[#6B3A12]">
                      {book.category}
                    </span>

                    <p className="mt-2 text-sm text-muted">
                      {book.availableCopies} of {book.totalCopies} available
                      &middot; {formatDate(book.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="ml-auto flex gap-3">
                  <EditBookDialog book={book} />
                  <DeleteBookDialog book={book} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default MyBooksPage;
