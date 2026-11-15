"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { BookType } from "@/lib/Types/BookType";
import { tokenFromClient } from "@/lib/tokenClient";

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
  "Mystery",
  "Poetry",
  "Philosophy",
  "Romance",
  "Self-Help",
  "Science Fiction",
  "Thriller",
  "True Crime",
  "Young Adult",
] as const;

const EditBookDialog = ({ book }: { book: BookType }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    category: book.category,
    totalCopies: String(book.totalCopies),
    bookImage: book.bookImage,
    description: book.description,
  });

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const token = await tokenFromClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update book");
      }

      toast.success("Book updated successfully");
      setIsOpen(false);
      router.replace("/my-books");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-[#CFC3AA] bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/20";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] border-forest px-4 text-sm font-bold text-forest transition-colors hover:bg-sand"
      >
        <Pencil className="size-3.5" aria-hidden />
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-ink">
                  Edit Book
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Update your book information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={submitting}
                className="rounded-full p-2 hover:bg-sand"
                aria-label="Close dialog"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-sm font-bold">Book Title</label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold">Author</label>
                <input
                  className={inputClass}
                  value={form.author}
                  onChange={(e) => updateField("author", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold">Category</label>
                <select
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
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
              </div>

              <div>
                <label className="text-sm font-bold">Total Copies</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  className={inputClass}
                  value={form.totalCopies}
                  onChange={(e) => updateField("totalCopies", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold">Book Image URL</label>
                <input
                  type="url"
                  className={inputClass}
                  value={form.bookImage}
                  onChange={(e) => updateField("bookImage", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold">Description</label>
                <textarea
                  rows={4}
                  className={inputClass}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={submitting}
                  className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-border px-5 font-bold text-ink hover:bg-sand"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-forest px-5 font-bold text-white hover:bg-forest-deep disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBookDialog;
