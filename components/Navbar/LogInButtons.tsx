"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Profile } from "./Profile";

const LogInButtons = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="h-11 w-44 animate-pulse rounded-full bg-sand" />;
  }

  if (session?.user) return <Profile user={session.user} />;

  return (
    <div className="flex shrink-0 gap-3">
      <Link
        href="/signin"
        onClick={onNavigate}
        className="inline-flex h-11 items-center rounded-full border-[1.5px] border-forest px-5 font-bold text-forest transition-colors hover:bg-sand"
      >
        Log In
      </Link>
      <Link
        href="/signup"
        onClick={onNavigate}
        className="inline-flex h-11 items-center rounded-full bg-forest px-5 font-bold text-white transition-colors hover:bg-forest-deep"
      >
        Register
      </Link>
    </div>
  );
};

export default LogInButtons;
