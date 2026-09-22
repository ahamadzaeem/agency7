"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -30,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(contentRef.current?.children ?? [], {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      gsap.from(quoteRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F7F6F3] py-24 md:py-32 border-t border-[#D8D6D1]"
      aria-label="About the founder"
    >
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">

          {/* Portrait */}
          <div
            ref={imageRef}
            className="flex-shrink-0 w-full lg:w-[280px] xl:w-[320px]"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src="/images/founder.jpg"
                alt="Laura Ciobanu — Founder and Managing Director of The Agency 7"
                fill
                className="object-cover object-top grayscale"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex-1 max-w-[520px]">
            <p className="label-text mb-6">About the Founder</p>

            <h2
              className="text-[2.5rem] md:text-[3.2rem] xl:text-[3.8rem] text-[#111111] leading-[1.08] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Experience Matters.
            </h2>

            <div className="mb-4">
              <p
                className="text-[1.1rem] text-[#111111] font-medium"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Laura Ciobanu
              </p>
              <p className="label-text mt-1">Founder &amp; Managing Director</p>
            </div>

            <div className="w-8 h-[1px] bg-[#D8D6D1] my-6" />

            <p className="text-[13.5px] text-[#555555] leading-[1.75] font-[family-name:var(--font-inter)] mb-6">
              Agency Seven is built around something that cannot be created overnight: local experience, relationships and an understanding of how business works in the UAE.
            </p>
            <p className="text-[13.5px] text-[#555555] leading-[1.75] font-[family-name:var(--font-inter)] mb-6">
              After more than two decades of professional and entrepreneurial experience in the UAE, Laura brings together international perspective and practical knowledge of the local business environment.
            </p>
            <p className="text-[13.5px] text-[#555555] leading-[1.75] font-[family-name:var(--font-inter)] mb-8">
              Her approach is personal and hands-on. Rather than providing generic solutions, Laura works to understand each client's objectives, identify the appropriate path and connect the people and expertise required to move a project forward.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-[#333333] border-b border-[#333333] pb-1 hover:text-[#111111] hover:border-[#111111] transition-colors duration-200 font-[family-name:var(--font-inter)]"
            >
              Learn More →
            </Link>
          </div>

          {/* Quote */}
          <blockquote
            ref={quoteRef}
            className="flex-shrink-0 lg:w-[220px] xl:w-[260px] border-l-2 border-[#D8D6D1] pl-6 py-2 self-center"
          >
            <p
              className="text-[1.35rem] text-[#111111] leading-[1.5] italic mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;Understand the opportunity.
              <br />
              Connect the right people.
              <br />
              Create the strategy.
              <br />
              Make it happen.&rdquo;
            </p>
            <cite className="label-text not-italic">Laura Ciobanu</cite>
          </blockquote>

        </div>
      </div>
    </section>
  );
}
