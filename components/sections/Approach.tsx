"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We listen to the client's objectives and understand the opportunity.",
  },
  {
    number: "02",
    title: "Assess",
    description:
      "We evaluate the market, requirements and potential strategy.",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "We identify relevant partners, suppliers, specialists and commercial connections.",
  },
  {
    number: "04",
    title: "Coordinate",
    description:
      "We support the project and help coordinate the different parties involved.",
  },
  {
    number: "05",
    title: "Grow",
    description:
      "We continue supporting clients as their business develops in the UAE.",
  },
];

export default function Approach({ hideHeader = false }: { hideHeader?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current?.children ?? [], {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Steps stagger in
      gsap.from(stepsRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F7F6F3] py-24 md:py-32"
      aria-label="Our approach"
    >
      <div className="container-wide">
        {/* Header */}
        {!hideHeader && (
          <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
            <div className="flex-1">
              <p className="text-[9px] tracking-[0.25em] text-[#555555] uppercase font-[family-name:var(--font-inter)] mb-6">
                THE AGENCY SEVEN APPROACH
              </p>
              <h2
                className="text-[3rem] md:text-[3.5rem] lg:text-[4.2rem] text-[#111111] leading-[1.05] tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                More Than Advice.
              </h2>
              <div className="w-10 h-[1px] bg-[#222222] mt-8" />
            </div>
            <div className="lg:w-[460px] lg:pt-14">
              <p className="text-[13px] text-[#555555] leading-[1.7] font-[family-name:var(--font-inter)]">
                We believe successful business development requires more than information. It requires understanding the market, identifying the right opportunity, connecting the right people and coordinating execution.
              </p>
            </div>
          </div>
        )}

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12"
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="lg:border-r border-[#D8D6D1] lg:px-7 lg:last:border-r-0 lg:first:pl-0 lg:last:pr-0"
            >
              <span
                className="block text-[3.8rem] text-[#D0CDCA] leading-none mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3
                className="text-[1.6rem] text-[#111111] mb-4"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {step.title}
              </h3>
              <p className="text-[11.5px] text-[#555555] leading-[1.7] font-[family-name:var(--font-inter)] max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
