"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProfessionalNetwork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#111111] text-[#F7F6F3] py-24 md:py-32"
    >
      <div className="container-wide max-w-[800px] mx-auto text-center">
        <p className="text-[10px] tracking-[0.25em] text-[#999999] uppercase font-[family-name:var(--font-inter)] mb-6">
          PROFESSIONAL NETWORK
        </p>
        
        <h2 
          className="text-[2.5rem] md:text-[3.5rem] text-white leading-[1.1] mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          One Relationship. The Right Expertise.
        </h2>
        
        <div className="w-10 h-[1px] bg-[#444444] mx-auto mb-10" />
        
        <p className="text-[14px] text-[#BBBBBB] leading-[1.8] font-[family-name:var(--font-inter)] mb-6 max-w-[600px] mx-auto">
          Some projects require specialist services outside Agency Seven&apos;s direct activities.
        </p>
        
        <p className="text-[14px] text-[#BBBBBB] leading-[1.8] font-[family-name:var(--font-inter)] max-w-[700px] mx-auto">
          Where appropriate, Agency Seven can coordinate clients with independent, appropriately qualified or licensed professionals within its network for areas such as legal, accounting, taxation, government procedures and other specialist requirements.
        </p>
      </div>
    </section>
  );
}
