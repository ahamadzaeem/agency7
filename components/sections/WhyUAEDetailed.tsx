"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    title: "Strategic Global Hub",
    description: "Positioned at the crossroads of Europe, Asia, and Africa, the UAE offers unparalleled access to emerging and established markets, making it the perfect launchpad for global expansion."
  },
  {
    title: "Business-Friendly Ecosystem",
    description: "With numerous free zones offering 100% foreign ownership, zero personal income tax, and highly competitive corporate tax rates, the UAE is built to accelerate business growth."
  },
  {
    title: "World-Class Infrastructure",
    description: "From state-of-the-art logistics and transport networks to cutting-edge digital infrastructure, the UAE provides the operational foundation required for modern businesses to thrive."
  },
  {
    title: "Innovation & Talent",
    description: "A forward-thinking government and progressive visa policies attract top-tier global talent, creating a dynamic environment driven by innovation and visionary leadership."
  }
];

export default function WhyUAEDetailed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.advantage-item');
      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            once: true
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white py-24 md:py-32" ref={containerRef}>
      <div className="container-wide max-w-[1000px] mx-auto">
        <div className="mb-16 md:mb-24">
          <h2 
            className="text-[2.5rem] md:text-[3.5rem] text-[#111111] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            The Ultimate Platform <br/> for Global Ambition.
          </h2>
          <div className="w-10 h-[1px] bg-[#222222] mb-8" />
          <p className="text-[15px] text-[#555555] leading-[1.8] font-[family-name:var(--font-inter)] max-w-[700px]">
            Beyond its impressive skyline, the UAE is a carefully engineered economic engine. It provides security, transparency, and a regulatory framework designed specifically to empower entrepreneurs and multinational corporations alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {advantages.map((adv, i) => (
            <div key={i} className="advantage-item flex flex-col">
              <span 
                className="text-[2.5rem] text-[#D8D6D1] leading-none mb-4 block"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                0{i + 1}
              </span>
              <h3 
                className="text-[1.8rem] text-[#111111] leading-[1.2] mb-4"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {adv.title}
              </h3>
              <p className="text-[14px] text-[#555555] leading-[1.7] font-[family-name:var(--font-inter)]">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
