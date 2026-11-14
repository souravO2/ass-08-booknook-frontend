"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const publicLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "All Books", href: "/all-books" },
];

const privateLinks = [
  { id: 3, name: "Add Book", href: "/add-book" },
  { id: 4, name: "My Books", href: "/my-books" },
  { id: 5, name: "My Borrows", href: "/my-borrows" },
];

type Props = { className?: string; onNavigate?: () => void };

const NavLinks = ({ className = "", onNavigate }: Props) => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const links = session?.user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className={className}>
      {links.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          onClick={onNavigate}
          className={`border-b-2 pb-1 text-base transition-colors ${
            isActive(item.href)
              ? "border-amber font-bold text-amber"
              : "border-transparent font-medium text-ink hover:text-forest"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
