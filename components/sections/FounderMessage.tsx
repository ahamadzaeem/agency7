"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FounderMessage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".founder-anim", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E8E5DF]"
    >
      <div className="container-wide max-w-[920px] mx-auto px-6 md:px-8">
        <div className="founder-anim mb-8">
          <p className="text-[10px] tracking-[0.25em] text-[#888888] uppercase font-[family-name:var(--font-inter)] mb-3">
            FOUNDER &amp; MANAGING DIRECTOR
          </p>
          <div className="w-8 h-[1px] bg-[#111111]" />
        </div>

        <div className="space-y-6 text-[#222222] font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] leading-[1.85]">
          <p className="founder-anim">
            I believe that real connection between people is born from passion, heart and a sincere desire to understand and help one another.
          </p>
          <p className="founder-anim">
            With more than 24 years of experience in the UAE, I have learned that successful consulting is not only about knowledge, strategy or opportunities — it is about listening to people, understanding their vision and being genuinely present throughout their journey.
          </p>
          <p className="founder-anim">
            Through Agency Seven, I bring together my experience, trusted relationships and personal commitment to help each client make confident decisions, connect with the right people and transform their ambitions into something real and meaningful.
          </p>
        </div>

        <div className="founder-anim mt-12 pt-8 border-t border-[#E5E1D8]">
          <blockquote
            className="text-[1.45rem] md:text-[1.85rem] text-[#111111] leading-[1.35] mb-4 italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            &ldquo;When experience is guided by heart, every connection can become the beginning of something extraordinary.&rdquo;
          </blockquote>
          <p className="text-[11px] tracking-[0.2em] text-[#555555] uppercase font-[family-name:var(--font-inter)]">
            — Laura Ciobanu
          </p>
        </div>
      </div>
    </section>
  );
}

