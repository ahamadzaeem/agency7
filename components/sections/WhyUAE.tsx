"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyUAE() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on background
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text entrance
      gsap.from(textRef.current?.children ?? [], {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      // Right text entrance
      if (rightTextRef.current) {
        gsap.from(rightTextRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[100svh] flex items-center py-32"
      aria-label="Why the UAE"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 scale-[1.1]" ref={bgRef}>
        <Image
          src="/images/why-uae-bg.png?v=2"
          alt="Dubai Skyline architectural view"
          fill
          className="object-cover object-[15%_center] xl:object-left"
          priority
          sizes="100vw"
        />
        {/* Subtle gradient overlay to ensure text readability on the left arch */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent w-full md:w-[60%] z-10" />
      </div>

      <div className="container-wide relative z-20 flex justify-between items-center w-full h-full pt-10">
        {/* LEFT CONTENT */}
        <div className="w-[55%] max-w-[680px]" ref={textRef}>
          <p className="text-[9px] tracking-[0.25em] text-[#333333] uppercase font-[family-name:var(--font-inter)] mb-8 ml-2">
            WHY THE UAE?
          </p>

          <h2
            className="text-[3.8rem] md:text-[5rem] xl:text-[5.5rem] leading-[1.05] text-[#111111] tracking-[-0.02em] mb-8"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            <span className="block">A global platform</span>
            <span className="block">for business, investment</span>
            <span className="block">and growth.</span>
          </h2>

          <p className="text-[14px] md:text-[15px] text-[#333333] leading-[1.7] font-[family-name:var(--font-inter)] mb-10 max-w-[480px] pr-8 ml-2">
            The UAE has become one of the world&apos;s most dynamic environments for entrepreneurs and international companies. Agency Seven helps clients understand the market, identify opportunities and develop the right strategy for entering or expanding within the UAE.
          </p>

          <Link
            href="/why-uae"
            className="inline-flex items-center gap-4 bg-[#111111] text-white px-8 py-4 group hover:bg-[#333333] transition-colors ml-2"
          >
            <span className="text-[9px] tracking-[0.2em] uppercase font-[family-name:var(--font-inter)]">
              Explore The UAE
            </span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>

        {/* RIGHT CONTENT (Floating Stack) */}
        <div className="hidden lg:flex flex-col gap-4 text-right justify-center" ref={rightTextRef}>
          <span className="text-[9px] tracking-[0.25em] text-[#333333] uppercase font-[family-name:var(--font-inter)] block">OPPORTUNITY</span>
          <span className="text-[9px] tracking-[0.25em] text-[#333333] uppercase font-[family-name:var(--font-inter)] block">PEOPLE</span>
          <span className="text-[9px] tracking-[0.25em] text-[#333333] uppercase font-[family-name:var(--font-inter)] block">GROWTH</span>
          <span className="text-[9px] tracking-[0.25em] text-[#333333] uppercase font-[family-name:var(--font-inter)] block">A BRIGHTER</span>
          <span className="text-[9px] tracking-[0.25em] text-[#333333] uppercase font-[family-name:var(--font-inter)] block">TOMORROW</span>
        </div>
      </div>
    </section>
  );
}
