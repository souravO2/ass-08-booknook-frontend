"use client";

import * as React from "react";
import Link from "next/link";
import { LogOut, Menu, User, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";
import NavLinks from "./NavLinks";
import LogInButtons from "./LogInButtons";
import { UserAvatar, useLogout } from "./Profile";

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const logout = useLogout();
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Open menu"
          className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-border bg-white text-ink"
        >
          <Menu className="size-5" />
        </SheetTrigger>

        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-72 bg-paper p-6"
        >
          <SheetHeader className="flex-row items-center justify-between p-0">
            <SheetTitle className="font-heading text-2xl text-forest">
              BookNook
            </SheetTitle>
            <SheetClose
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-border bg-white text-ink"
            >
              <X className="size-5" />
            </SheetClose>
          </SheetHeader>

          <NavLinks
            className="mt-6 flex flex-col items-start gap-5"
            onNavigate={close}
          />

          {session?.user ? (
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <UserAvatar user={session.user} className="size-11" />
                <div className="min-w-0">
                  <p className="truncate font-bold text-ink">
                    {session.user.name}
                  </p>
                  <p className="truncate text-sm text-muted">
                    {session.user.email}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1">
                <Link
                  href="/profile"
                  onClick={close}
                  className="flex items-center gap-2 rounded-lg px-2 py-2.5 font-medium text-ink hover:bg-sand"
                >
                  <User className="size-4" /> My Profile
                </Link>
                <button
                  onClick={() => {
                    close();
                    logout();
                  }}
                  className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-left font-bold text-error hover:bg-error/10"
                >
                  <LogOut className="size-4" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <LogInButtons onNavigate={close} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
