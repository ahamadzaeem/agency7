import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why UAE", href: "/why-uae" },
  { label: "UAE ↔ Europe", href: "/uae-europe" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#F7F6F3] border-t border-[#D8D6D1] py-12"
      aria-label="Site footer"
    >
      <div className="container-wide">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-[#D8D6D1]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative h-14 w-60 md:h-20 md:w-[340px] transition-opacity group-hover:opacity-70">
              <Image
                src="/images/agency7-logo.png"
                alt="The Agency 7 Logo"
                fill
                className="object-contain object-left opacity-90 group-hover:opacity-100 transition-opacity"
                sizes="(max-width: 768px) 240px, 340px"
              />
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.04em] text-[#777777] hover:text-[#111111] transition-colors duration-200"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social + tagline */}
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#777777] hover:text-[#111111] transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#777777] hover:text-[#111111] transition-colors duration-200"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <div className="hidden lg:block h-8 w-[1px] bg-[#D8D6D1] ml-2" aria-hidden="true" />
            <span
              className="hidden lg:block text-[10px] text-[#777777] leading-[1.5] text-right"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              Your Strategic Partner
              <br />
              in the UAE
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-8">
          <p
            className="text-[10px] text-[#D8D6D1] tracking-[0.04em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            © {new Date().getFullYear()} The Agency 7 Global Consultancy FZ-LLC. All rights reserved.
          </p>
          <Link
            href="/contact"
            className="text-[10px] text-[#777777] hover:text-[#111111] tracking-[0.04em] transition-colors duration-200"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            contact@theagency7.com
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterGlobe() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" stroke="#777777" strokeWidth="0.7" />
      <ellipse cx="16" cy="16" rx="6" ry="14" stroke="#777777" strokeWidth="0.7" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="#777777" strokeWidth="0.7" />
      <line x1="4" y1="10" x2="28" y2="10" stroke="#777777" strokeWidth="0.7" />
      <line x1="4" y1="22" x2="28" y2="22" stroke="#777777" strokeWidth="0.7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}
