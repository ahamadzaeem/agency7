"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function UAEEurope() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current?.children ?? [], {
        opacity: 0,
        y: 28,
        duration: 0.85,
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
      className="relative min-h-[80vh] flex items-center overflow-hidden"
      aria-label="UAE and Europe connection"
    >
      <Image
        src="/images/uae-europe.jpg"
        alt="UAE and Europe business connection"
        fill
        className="object-cover grayscale brightness-[0.85]"
        sizes="100vw"
        priority
      />
      {/* Dark overlay for better text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.3) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10 py-24 md:py-32">
        <div ref={leftRef} className="max-w-[560px]">
          <p className="label-text text-[#D8D6D1] mb-5">UAE ↔ Europe</p>

          <h2
            className="text-[2.5rem] md:text-[3.5rem] xl:text-[4.5rem] text-white leading-[1.05] mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Connecting Markets.
            <br />
            Creating Opportunities.
          </h2>

          <p className="text-[1rem] text-[#D8D6D1] leading-[1.7] mb-6 font-[family-name:var(--font-inter)]">
            Agency Seven acts as a business bridge between the UAE and Europe, helping international companies better understand and access opportunities in the Emirates.
          </p>

          <p className="text-[1rem] text-[#D8D6D1] leading-[1.7] mb-6 font-[family-name:var(--font-inter)]">
            For European companies entering the UAE, we provide local market insight, strategic guidance and coordination.
          </p>

          <p className="text-[1rem] text-[#D8D6D1] leading-[1.7] mb-6 font-[family-name:var(--font-inter)]">
            For UAE businesses looking for European opportunities, products, suppliers or partnerships, we can support commercial connections and project development.
          </p>

          <p className="text-[1.1rem] text-white leading-[1.7] mb-10 font-[family-name:var(--font-serif)] italic">
            Two markets. One strategic connection.
          </p>

          <Link
            href="/uae-europe"
            className="inline-flex items-center gap-3 border border-white/40 text-white text-[11px] tracking-[0.1em] uppercase px-8 py-4 hover:bg-white/10 transition-colors duration-300 w-fit font-[family-name:var(--font-inter)]"
          >
            Explore the Connection
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
