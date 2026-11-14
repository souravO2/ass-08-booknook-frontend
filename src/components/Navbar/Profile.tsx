"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";

type U = { name: string; email: string; image?: string | null };

export function useLogout() {
  const router = useRouter();
  return async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };
}

export function UserAvatar({
  user,
  className = "",
}: {
  user: U;
  className?: string;
}) {
  const initials = (user.name || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Avatar className={className}>
      <AvatarImage
        src={user.image ?? undefined}
        alt={user.name}
        referrerPolicy="no-referrer"
      />
      <AvatarFallback className="bg-amber font-bold text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

export function Profile({ user }: { user: U }) {
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open user menu"
        className="cursor-pointer rounded-full outline-none transition-shadow hover:ring-2 hover:ring-forest/30 focus-visible:ring-2 focus-visible:ring-forest data-popup-open:ring-2 data-popup-open:ring-forest"
      >
        <UserAvatar user={user} className="size-11" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-2xl border border-border bg-white p-2 shadow-[0_12px_30px_rgba(30,43,38,0.15)]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-3 rounded-xl bg-paper p-3">
            <UserAvatar user={user} className="size-10 shrink-0" />
            <div className="min-w-0">
              <p className="truncate font-heading text-base font-bold text-ink">
                {user.name}
              </p>
              <p className="truncate text-sm font-normal text-muted">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-border" />

        <DropdownMenuItem
          render={<Link href="/profile" />}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink focus:bg-sand focus:text-ink data-highlighted:bg-sand data-highlighted:text-ink"
        >
          <User className="size-4 text-forest" /> My Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={logout}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] font-bold text-error focus:bg-error/10 focus:text-error data-highlighted:bg-error/10 data-highlighted:text-error"
        >
          <LogOut className="size-4 text-error" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
