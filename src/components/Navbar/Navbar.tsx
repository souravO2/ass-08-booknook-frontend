import Image from "next/image";
import Link from "next/link";
import LogInButtons from "./LogInButtons";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white backdrop-blur">
      <nav className="mx-auto flex py-4 max-w-7xl items-center gap-8 px-4 md:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            className="rounded-lg"
            alt="BookNook logo"
          />
          <span className="font-heading text-2xl font-bold text-forest">
            BookNook
          </span>
        </Link>

        <NavLinks className="hidden items-center gap-7 md:flex" />

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:block">
            <LogInButtons />
          </div>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
