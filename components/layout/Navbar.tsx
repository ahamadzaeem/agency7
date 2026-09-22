"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why UAE", href: "/why-uae" },
  { label: "UAE ↔ Europe", href: "/uae-europe" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll state
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuRef.current || !menuLinksRef.current) return;
    if (menuOpen) {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.7,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        menuLinksRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F7F6F3]/90 backdrop-blur-md border-b border-[#D8D6D1] py-2"
            : "bg-transparent py-4"
        }`}
        aria-label="Main navigation"
      >
        <div className="container-wide flex items-center justify-between min-h-[90px]">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group py-1">
            <div className="relative h-14 w-60 md:h-20 md:w-[340px] transition-opacity group-hover:opacity-70">
              <Image
                src="/images/agency7-logo.png"
                alt="The Agency 7 Logo"
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 768px) 240px, 340px"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11.5px] tracking-[0.08em] text-[#333333] hover:text-[#111111] transition-colors duration-200 font-[family-name:var(--font-inter)] uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 bg-[#111111] text-[#F7F6F3] text-[10.5px] tracking-[0.12em] uppercase px-6 py-3 hover:bg-[#333333] transition-colors duration-300 font-[family-name:var(--font-inter)]"
            >
              Discuss Your Project
              <span className="text-[12px] opacity-70">→</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-[#111111] hover:text-[#555] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#F7F6F3] flex flex-col justify-center px-8"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div ref={menuLinksRef} className="flex flex-col gap-8 mt-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-cormorant)] text-5xl text-[#111111] italic hover:opacity-70 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 bg-[#111111] text-[#F7F6F3] text-[11px] tracking-[0.1em] uppercase px-6 py-3.5 w-fit font-[family-name:var(--font-inter)] hover:bg-[#333333] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Discuss Your Project →
          </Link>
        </div>
      </div>
    </>
  );
}

function GlobeLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" stroke="#111111" strokeWidth="0.7" />
      <ellipse cx="16" cy="16" rx="6" ry="14" stroke="#111111" strokeWidth="0.7" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="#111111" strokeWidth="0.7" />
      <line x1="4" y1="10" x2="28" y2="10" stroke="#111111" strokeWidth="0.7" />
      <line x1="4" y1="22" x2="28" y2="22" stroke="#111111" strokeWidth="0.7" />
      {/* dots pattern */}
      {[...Array(8)].map((_, i) => (
        <circle
          key={i}
          cx={6 + i * 2.8}
          cy={16}
          r={0.6}
          fill="#111111"
          opacity={0.5}
        />
      ))}
    </svg>
  );
}
