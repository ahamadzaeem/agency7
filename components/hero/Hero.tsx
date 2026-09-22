"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const DottedGlobe = dynamic(() => import("./DottedGlobe"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#F7F6F3] text-[#111111]">
      {/* ── HERO GRID ────────────────────────────────────────────────────── */}
      <div className="mx-auto grid min-h-[100svh] max-w-[1500px] grid-cols-1 items-center px-6 pt-24 md:grid-cols-2 md:px-12 md:pt-0 relative">
        {/* ── LEFT COLUMN — GLOBE ──────────────────────────────────────── */}
        <div className="relative h-[440px] md:h-[680px] w-full flex items-center justify-center">
          <DottedGlobe />

          {/* Left side editorial markers */}
          <div
            className="absolute left-0 top-1/2 hidden -translate-y-1/2 text-[8px] leading-7 tracking-[0.3em] text-[#777777] uppercase lg:block"
            style={{ fontFamily: "var(--font-inter)" }}
            aria-hidden="true"
          >
            IDEAS —<br />
            MARKETS —<br />
            PEOPLE —<br />
            OPPORTUNITIES
          </div>

          {/* Bottom 01 — 05 counter */}
          <div
            className="absolute bottom-8 left-10 flex items-center gap-3 text-[8.5px] tracking-[0.35em] text-[#999999]"
            style={{ fontFamily: "var(--font-inter)" }}
            aria-hidden="true"
          >
            <span>01</span>
            <div className="w-8 h-[1px] bg-[#D8D6D1]" />
            <span>05</span>
          </div>
        </div>

        {/* ── RIGHT COLUMN — CONTENT ────────────────────────────────────── */}
        <div className="flex items-center px-3 pb-20 md:px-10 md:pb-0">
          <div className="max-w-[580px]">
            <p
              className="mb-6 text-[9.5px] tracking-[0.38em] text-[#777777] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              THE AGENCY 7
            </p>

            <h1
              className="text-[48px] md:text-[68px] xl:text-[76px] leading-[0.96] tracking-[-0.035em] text-[#111111]"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              <span className="italic block">Your Strategic</span>
              <span className="block">Partner in the UAE</span>
            </h1>

            <p
              className="mt-8 max-w-[480px] text-[19px] md:text-[21px] leading-[1.35] text-[#333333]"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              Turning opportunities into businesses, projects and lasting
              connections.
            </p>

            <p
              className="mt-6 max-w-[480px] text-[13.5px] leading-6 text-[#777777]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              We help entrepreneurs and international companies navigate the UAE
              market through strategic consulting, project management, marketing
              and commercial connections.
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-7"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Link
                href="/services"
                className="bg-[#111111] px-7 py-4 text-[9.5px] tracking-[0.13em] text-[#F7F6F3] uppercase hover:bg-[#333333] transition-colors"
              >
                DISCOVER OPPORTUNITIES →
              </Link>

              <Link
                href="/contact"
                className="border-b border-[#222222] pb-1 text-[9.5px] tracking-[0.15em] text-[#222222] hover:text-[#111111] transition-colors uppercase"
              >
                SPEAK WITH US
              </Link>
            </div>
          </div>
        </div>

        {/* Far Right Label */}
        <div
          className="hidden xl:flex flex-col items-end gap-1 absolute right-8 top-1/2 -translate-y-1/2 text-[7.5px] tracking-[0.25em] text-[#BBBBBB] uppercase leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
          aria-hidden="true"
        >
          <span>A STRONGER</span>
          <span>TOMORROW</span>
          <span>IN THE UAE</span>
        </div>
      </div>
    </section>
  );
}

function GlobeLogoIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" stroke="#111111" strokeWidth="0.8" />
      <ellipse cx="16" cy="16" rx="6" ry="14" stroke="#111111" strokeWidth="0.8" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="#111111" strokeWidth="0.8" />
      <line x1="4" y1="10" x2="28" y2="10" stroke="#111111" strokeWidth="0.8" />
      <line x1="4" y1="22" x2="28" y2="22" stroke="#111111" strokeWidth="0.8" />
    </svg>
  );
}
