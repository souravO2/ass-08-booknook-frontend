// components/ProfileView.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Library, Loader2, LogOut, Pencil, Plus } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { UserAvatar, useLogout } from "@/components/Navbar/Profile";
import EditProfileDialog from "./EditProfileDialog";

export default function ProfileView() {
  const { data: session, isPending } = useSession();
  const logout = useLogout();
  const user = session?.user;

  const [editing, setEditing] = React.useState(false);
  const [counts, setCounts] = React.useState<{
    books: number | null;
    borrows: number | null;
  }>({ books: null, borrows: null });

  React.useEffect(() => {
    if (!user?.email) return;
    const base = process.env.NEXT_PUBLIC_API_URL;
    const email = encodeURIComponent(user.email);

    const count = (path: string) =>
      fetch(`${base}${path}`, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data: unknown[]) => data.length)
        .catch(() => null);

    Promise.all([
      count(`/my-books/${email}`),
      count(`/my-borrows/${email}`),
    ]).then(([books, borrows]) => setCounts({ books, borrows }));
  }, [user?.email]);

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2
          className="size-10 animate-spin text-forest"
          aria-label="Loading profile"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-heading text-2xl font-bold text-ink">
          Please log in to see your profile
        </p>
        <Link
          href="/signin?redirect=/profile"
          className="mt-5 inline-block rounded-full bg-forest px-6 py-3 font-bold text-white hover:bg-forest-deep"
        >
          Log In
        </Link>
      </main>
    );
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  const stats = [
    {
      label: "Books added",
      value: counts.books,
      href: "/my-books",
      icon: BookOpen,
    },
    {
      label: "Books borrowed",
      value: counts.borrows,
      href: "/my-borrows",
      icon: Library,
    },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 pt-14 pb-24 md:px-8">
      <h1 className="mb-8 font-heading text-4xl font-bold text-ink md:text-5xl">
        My Profile
      </h1>

      <section className="overflow-hidden rounded-3xl border border-border bg-white">
        {/* Banner */}
        <div className="h-32 bg-forest" />

        <div className="px-6 pb-8 sm:px-10">
          <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <UserAvatar
              user={user}
              className="size-28 border-4 border-white *:data-[slot=avatar-fallback]:text-4xl"
            />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setEditing(true)}
                className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] border-forest px-5 font-bold text-forest transition-colors hover:bg-sand"
              >
                <Pencil className="size-4" aria-hidden /> Edit Profile
              </button>
              <Link
                href="/add-book"
                className="inline-flex h-11 items-center gap-1.5 rounded-full bg-forest px-5 font-bold text-white transition-colors hover:bg-forest-deep"
              >
                <Plus className="size-4" aria-hidden /> Add Book
              </Link>
              <button
                onClick={logout}
                className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] border-error px-5 font-bold text-error transition-colors hover:bg-error/10"
              >
                <LogOut className="size-4" aria-hidden /> Logout
              </button>
            </div>
          </div>

          <h2 className="mt-5 font-heading text-3xl font-bold text-ink">
            {user.name}
          </h2>
          <p className="text-muted">{user.email}</p>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {stats.map(({ label, value, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-2xl bg-sand p-5 transition-colors hover:bg-[#E2D4B6]"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-forest text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-heading text-3xl leading-none font-bold text-ink">
                    {value ?? "–"}
                  </span>
                  <span className="text-sm text-ink/70">{label}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Details */}
          <dl className="mt-8 rounded-2xl border border-border px-6 py-2">
            <div className="flex justify-between gap-4 border-b border-[#E8DFCB] py-3.5">
              <dt className="text-muted">Name</dt>
              <dd className="text-right font-bold text-ink">{user.name}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[#E8DFCB] py-3.5">
              <dt className="text-muted">Email</dt>
              <dd className="min-w-0 truncate text-right font-bold text-ink">
                {user.email}
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-3.5">
              <dt className="text-muted">Member since</dt>
              <dd className="text-right font-bold text-ink">{memberSince}</dd>
            </div>
          </dl>
        </div>
      </section>

      {editing && (
        <EditProfileDialog user={user} onClose={() => setEditing(false)} />
      )}
    </main>
  );
}
