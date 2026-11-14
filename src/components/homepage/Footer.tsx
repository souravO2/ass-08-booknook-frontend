import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";

const socials = [
  { name: "X", href: "https://x.com/SouravSaifur", icon: FaXTwitter },
  {
    name: "Facebook",
    href: "https://www.facebook.com/saifurrahmansourav2",
    icon: FaFacebookF,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/saifur-rahman-sourav/",
    icon: FaLinkedinIn,
  },
];

const Footer = () => {
  return (
    <footer className="bg-forest-deep text-paper/85">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-7 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                width={40}
                height={40}
                className="rounded-lg"
                alt="BookNook logo"
              />
              <span className="font-heading text-2xl font-bold text-paper">
                BookNook
              </span>
            </Link>
            <p className="mt-4 leading-relaxed">
              A small online library where you add a book, borrow a book and
              return a book.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-bold text-gold">Contact</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:saifurrahmansourav93@gmail.com"
                  className="flex items-center gap-2 hover:text-gold"
                >
                  <Mail className="size-4" /> saifurrahmansourav93@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8800000000000"
                  className="flex items-center gap-2 hover:text-gold"
                >
                  <Phone className="size-4" /> +880 1521 702109
                </a>
              </li>
              <li>
                <a
                  href="https://s0v-portfolio.vercel.app/"
                  className="flex items-center gap-2 hover:text-gold"
                >
                  <RxAvatar className="size-5" /> Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 font-bold text-gold">Follow us</h3>
            <div className="flex gap-3">
              {socials.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-paper/40 text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-paper/20 pt-5 text-center text-sm">
          &copy; {new Date().getFullYear()} BookNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
