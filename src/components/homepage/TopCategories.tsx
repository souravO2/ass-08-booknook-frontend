// components/home/TopCategories.tsx
import Link from "next/link";
import { BookOpen } from "lucide-react";

type Category = { name: string; count: number };

const getTopCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/top-categories`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};

// Colors are picked by rank, not by category name
const palette = [
  "bg-forest",
  "bg-[#2F4A6D]",
  "bg-[#7A2E3A]",
  "bg-amber",
  "bg-[#4A5A2E]",
];

const TopCategories = async () => {
  const categories = await getTopCategories();
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <h2 className="mb-8 font-heading text-3xl leading-tight font-bold text-ink md:text-[40px]">
        Top Categories
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {categories.map(({ name, count }, i) => (
          <Link
            key={name}
            href={`/all-books`}
            className={`${palette[i % palette.length]} relative flex min-h-42.5 flex-col justify-between rounded-2xl p-5 text-paper transition-transform hover:-translate-y-1 ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}
          >
            <BookOpen className="size-7 opacity-90" aria-hidden />
            <span className="absolute top-5 right-5 text-sm font-bold opacity-80">
              #{i + 1}
            </span>
            <div>
              <span className="block font-heading text-2xl font-bold">
                {name}
              </span>
              <span className="text-sm opacity-90">
                {count} {count === 1 ? "book" : "books"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
