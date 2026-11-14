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
      <AvatarImage src={user.image ?? undefined} alt={user.name} />
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
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-forest"
      >
        <UserAvatar user={user} className="size-11" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl border-border bg-white"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="truncate font-bold text-ink">{user.name}</p>
            <p className="truncate text-sm font-normal text-muted">
              {user.email}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={<Link href="/profile" />}
          className="cursor-pointer"
        >
          <User className="size-4" /> My Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer font-bold text-error focus:text-error"
        >
          <LogOut className="size-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
