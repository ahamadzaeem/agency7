"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function UAEEuropeDetailed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#F7F6F3] py-24 md:py-32" ref={containerRef}>
      <div className="container-wide max-w-[900px] mx-auto">
        <div className="fade-up mb-16">
          <h2 
            className="text-[2.5rem] md:text-[3.5rem] text-[#111111] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            A Two-Way Strategic Bridge
          </h2>
          <div className="w-10 h-[1px] bg-[#222222] mb-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="fade-up">
            <h3 
              className="text-[1.8rem] text-[#111111] leading-[1.2] mb-6 border-l-2 border-[#D8D6D1] pl-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Europe to the UAE
            </h3>
            <p className="text-[14.5px] text-[#555555] leading-[1.8] font-[family-name:var(--font-inter)] mb-6">
              For European companies looking to enter the Middle East, the UAE serves as the ultimate gateway. However, understanding local nuances, legal structures, and commercial culture is vital for success.
            </p>
            <p className="text-[14.5px] text-[#555555] leading-[1.8] font-[family-name:var(--font-inter)]">
              We provide European businesses with critical on-the-ground market insight, strategic orientation, and direct coordination to ensure a seamless entry into the Emirates.
            </p>
          </div>

          <div className="fade-up">
            <h3 
              className="text-[1.8rem] text-[#111111] leading-[1.2] mb-6 border-l-2 border-[#D8D6D1] pl-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              UAE to Europe
            </h3>
            <p className="text-[14.5px] text-[#555555] leading-[1.8] font-[family-name:var(--font-inter)] mb-6">
              Conversely, many UAE-based entities seek high-quality European products, reliable suppliers, and strategic partnerships to elevate their local offerings and expand their portfolios.
            </p>
            <p className="text-[14.5px] text-[#555555] leading-[1.8] font-[family-name:var(--font-inter)]">
              Leveraging our extensive network, we support UAE businesses in identifying, vetting, and establishing commercial connections and project developments across European markets.
            </p>
          </div>
        </div>

        <div className="fade-up mt-20 p-10 bg-white border border-[#E5E5E5] text-center">
          <p className="text-[1.3rem] text-[#111111] leading-[1.6] font-[family-name:var(--font-cormorant)] italic">
            &quot;We do not just provide introductions; we help structure the strategy that makes those connections viable and profitable for both sides.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
