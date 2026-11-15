import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Borrows",
};

export default function MyBorrowsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
