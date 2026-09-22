"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2, // slight delay for smooth page transition
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pt-40 pb-20 md:pt-48 md:pb-32 bg-[#F7F6F3] border-b border-[#D8D6D1]">
      <div className="container-wide" ref={containerRef}>
        {subtitle && (
          <p className="text-[10px] tracking-[0.25em] text-[#555555] uppercase font-[family-name:var(--font-inter)] mb-6">
            {subtitle}
          </p>
        )}
        <h1
          className="text-[3.5rem] md:text-[5rem] xl:text-[6rem] text-[#111111] leading-[1.05] tracking-[-0.01em] max-w-[1000px]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
