import Link from "next/link";

export const metadata = { title: "Page Not Found" };

const NotFound = () => {
  return (
    <div className="flex min-h-100vh flex-col bg-paper text-[#1C2C26]">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        {/* Book Illustration */}
        <div className="mb-8 flex h-40 items-center justify-center gap-3">
          <div className="h-32 w-9 rounded-md bg-[#205344]" />
          <div className="h-40 w-9 rounded-md bg-[#AD541B]" />
          <div className="h-36 w-9 -rotate-14 rounded-md bg-[#345579]" />
          <div className="h-36 w-9 rounded-md bg-[#80323D]" />
        </div>

        {/* 404 */}
        <h1 className="font-serif text-[130px] font-bold leading-none tracking-tight text-ink md:text-[170px]">
          404
        </h1>

        <h2 className="mt-6 font-serif text-3xl font-bold md:text-4xl">
          This page is out of circulation.
        </h2>

        <p className="mt-4 max-w-md text-lg leading-relaxed text-[#65716B]">
          The page you are looking for has been moved or was never on our shelf.
        </p>

        <Link
          href="/"
          className="mt-8 rounded-full bg-forest px-7 py-3 font-semibold text-white transition-colors hover:bg-forest-deep"
        >
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
