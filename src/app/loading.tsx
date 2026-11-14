import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center bg-paper">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-3">
        <BookOpen size={34} strokeWidth={2.2} className="text-[#205344]" />
        <h1 className="font-serif text-3xl font-bold text-[#205344]">
          BookNook
        </h1>
      </div>

      {/* Animated Books */}
      <div className="mb-10 flex h-24 items-end justify-center gap-2">
        {[
          { height: "h-16", color: "bg-[#205344]", delay: "0ms" },
          { height: "h-24", color: "bg-[#AD541B]", delay: "150ms" },
          { height: "h-20", color: "bg-[#345579]", delay: "300ms" },
          { height: "h-16", color: "bg-[#80323D]", delay: "450ms" },
        ].map((book, index) => (
          <div
            key={index}
            style={{ animationDelay: book.delay }}
            className={`w-5 ${book.height} ${book.color} animate-bounce rounded-sm`}
          />
        ))}
      </div>

      {/* Loading Text */}
      <h2 className="font-serif text-xl font-bold text-[#205344]">
        Finding your next read...
      </h2>

      <p className="mt-2 text-sm text-[#65716B]">Preparing your bookshelf</p>

      {/* Loading Bar */}
      <div className="mt-7 h-1.5 w-48 overflow-hidden rounded-full bg-[#DED4C2]">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-[#205344]" />
      </div>

      <p className="mt-8 text-xs tracking-widest text-[#8A958E]">
        A LITTLE LIBRARY, A LOT OF STORIES.
      </p>
    </main>
  );
}
