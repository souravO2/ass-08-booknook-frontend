import BookCard from "@/components/books/BookCard";
import { BookType } from "@/lib/Types/BookType";

const allbooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-books`,{
    cache:"no-store"
  });
  return res.json();
};

const AllBooksPage = async () => {
  const books: BookType[] = await allbooks();
  console.log(books);
  return (
    <div className="max-w-7xl mx-auto pt-8 px-4 md:px-8">
      <div className="m-2">
        <h1 className="font-heading text-4xl font-bold text-ink md:text-5xl">
          All Books
        </h1>
        <p className="mt-2.5 text-lg text-muted">
          Every title on the shelf, ready to borrow.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-1">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooksPage;
