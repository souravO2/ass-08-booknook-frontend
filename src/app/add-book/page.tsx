"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { useSession } from "@/lib/auth-client";

const CATEGORIES = [
  "Action",
  "Adventure",
  "Biography",
  "Classics",
  "Crime",
  "Fantasy",
  "Graphic Novels",
  "History",
  "Historical Fiction",
  "Horror",
  "Literary Fiction",
  "Memoir",
  "Novel",
  "Mystery",
  "Poetry",
  "Philosophy",
  "Romance",
  "Self-Help",
  "Science Fiction",
  "Thriller",
  "True Crime",
  "Young Adult",
  "Others",
] as const;

const INITIAL_STATE = {
  title: "",
  author: "",
  category: "",
  totalCopies: 1,
  bookImage: "",
  description: "",
};

const fieldClasses =
  "h-11 w-full rounded-[10px] border-[1.5px] border-[#CFC3AA] bg-white px-3.5 text-[15px] text-ink transition outline-none placeholder:text-muted/70 focus-visible:border-forest focus-visible:ring-2 focus-visible:ring-forest/20 read-only:bg-sand/60";

export default function AddBookPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof INITIAL_STATE) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          totalCopies: Number(form.totalCopies),
          userName: session?.user.name,
          userEmail: session?.user.email,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Couldn't add the book");
      }

      console.log(result);
      toast.success("Book added successfully");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => setForm(INITIAL_STATE);

  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto text-center max-w-7xl">
        <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
          Add a Book
        </h1>
        <p className="mt-2 text-muted">
          Put a book on the shelf for other readers to borrow.
        </p>
      </div>
      <div className="mx-auto mt-6 max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-white p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
            {/* Book Title */}
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-bold">
                Book Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Book Title"
                value={form.title}
                onChange={(e) => set("title")(e.target.value)}
                className={cn(fieldClasses, "mt-2")}
                required
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-bold">
                Author Name
              </label>
              <input
                id="author"
                name="author"
                type="text"
                placeholder="Author Name"
                value={form.author}
                onChange={(e) => set("author")(e.target.value)}
                className={cn(fieldClasses, "mt-2")}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-bold">
                Category
              </label>
              <div className="relative mt-2">
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={(e) => set("category")(e.target.value)}
                  className={cn(
                    fieldClasses,
                    "appearance-none pr-9",
                    !form.category && "text-muted/70",
                  )}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
                />
              </div>
            </div>

            {/* Total Copies */}
            <div className="sm:col-span-2">
              <label htmlFor="totalCopies" className="block text-sm font-bold">
                Total Copies
              </label>
              <input
                id="totalCopies"
                name="totalCopies"
                type="number"
                min="1"
                step="1"
                placeholder="e.g., 3"
                value={form.totalCopies}
                onChange={(e) => set("totalCopies")(e.target.value)}
                className={cn(fieldClasses, "mt-2")}
                required
              />
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label htmlFor="image" className="block text-sm font-bold">
                Book Image URL
              </label>
              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/book-cover.jpg"
                value={form.bookImage}
                onChange={(e) => set("bookImage")(e.target.value)}
                className={cn(fieldClasses, "mt-2")}
                required
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-bold">
                Short Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="What is this book about?"
                value={form.description}
                onChange={(e) => set("description")(e.target.value)}
                className={cn(fieldClasses, "mt-2 h-auto resize-none py-2.5")}
                required
              />
            </div>

            {/* Your Name (read-only) */}
            <div>
              <label htmlFor="userName" className="block text-sm font-bold">
                Your Name
              </label>
              <input
                id="userName"
                type="text"
                value={session?.user.name ?? ""}
                readOnly
                className={cn(fieldClasses, "mt-2")}
              />
            </div>

            {/* Your Email (read-only) */}
            <div>
              <label htmlFor="userEmail" className="block text-sm font-bold">
                Your Email
              </label>
              <input
                id="userEmail"
                type="email"
                value={session?.user.email ?? ""}
                readOnly
                className={cn(fieldClasses, "mt-2")}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleCancel}
              className="h-11 cursor-pointer rounded-full border-[1.5px] border-error px-5 font-bold text-error hover:bg-error/10 hover:text-error"
            >
              <Trash2 data-icon="inline-start" aria-hidden />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="h-11 cursor-pointer rounded-full bg-forest px-5 font-bold text-white hover:bg-forest-deep disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : (
                <Save data-icon="inline-start" aria-hidden />
              )}
              {submitting ? "Adding..." : "Add Book"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
