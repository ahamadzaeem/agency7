"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: "UAE Market Experience",
    description: "Practical knowledge developed through years of working and doing business in the Emirates."
  },
  {
    title: "International Understanding",
    description: "We understand both European expectations and the UAE business environment."
  },
  {
    title: "One Point of Contact",
    description: "We help coordinate the different professionals and partners involved in a project."
  },
  {
    title: "Trusted Network",
    description: "Access to specialists, suppliers, companies and professional partners across different sectors."
  },
  {
    title: "Tailored Strategy",
    description: "Every client, project and investment objective is different."
  },
  {
    title: "Hands-On Approach",
    description: "We remain involved beyond the initial introduction."
  }
];

export default function WhyAgencySeven({ hideHeader = false }: { hideHeader?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children ?? [], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true
        }
      });

      gsap.from(gridRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-white"
    >
      <div className="container-wide">
        {!hideHeader && (
          <div ref={headerRef} className="mb-16 md:mb-24">
            <p className="text-[10px] tracking-[0.25em] text-[#555555] uppercase font-[family-name:var(--font-inter)] mb-6">
              WHY AGENCY SEVEN?
            </p>
            <h2
              className="text-[2.5rem] md:text-[3.5rem] xl:text-[4rem] text-[#111111] leading-[1.05]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Local Experience. <br/> International Perspective.
            </h2>
            <div className="w-10 h-[1px] bg-[#222222] mt-8" />
          </div>
        )}

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12"
        >
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-8 h-8 rounded-full border border-[#D8D6D1] flex items-center justify-center mb-6">
                <span className="text-[#111111] text-[12px] font-[family-name:var(--font-inter)]">
                  {i + 1}
                </span>
              </div>
              <h3 
                className="text-[1.4rem] text-[#111111] mb-3"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {reason.title}
              </h3>
              <p className="text-[13px] text-[#555555] leading-[1.7] font-[family-name:var(--font-inter)] max-w-[280px]">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
