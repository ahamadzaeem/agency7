"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#111111] py-28 md:py-40"
      aria-label="Contact call to action"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-background.jpg"
          alt="UAE architectural background"
          fill
          className="object-cover opacity-25 grayscale"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.65) 60%, rgba(17,17,17,0.8) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Subtle right-side city labels */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2" aria-hidden="true">
        {["DUBAI", "ABU DHABI", "SHARJAH", "UAE"].map((city) => (
          <span key={city} className="label-text text-[7px] text-[#777777] tracking-[0.25em] block">
            {city}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div ref={contentRef} className="max-w-[680px]">
          <p className="label-text text-[#777777] mb-8">Get in touch</p>

          <h2
            className="text-[2.8rem] md:text-[3.8rem] xl:text-[4.8rem] text-white leading-[1.08] mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your UAE Opportunity
            <br />
            Starts With a Conversation.
          </h2>

          <p className="text-[0.9rem] text-[#777777] leading-[1.75] max-w-[440px] mb-12">
            Whether you are exploring the UAE for the first time, expanding an existing company or developing a new project, Agency Seven can help you understand the opportunity and determine the next steps.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-4 bg-white text-[#111111] text-[11px] tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#F7F6F3] transition-colors duration-300 font-medium"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Let&apos;s Discuss Your Project
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
