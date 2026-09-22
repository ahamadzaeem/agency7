"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Business & Market\nEntry Consulting",
    description: "Understand the market before making the move.",
    image: "/images/service-consulting.jpg",
    imageAlt: "Strategic business consulting",
  },
  {
    number: "02",
    title: "Project Management\nConsultancy",
    description: "From concept to coordinated execution.",
    image: "/images/service-project.jpg",
    imageAlt: "Project management",
  },
  {
    number: "03",
    title: "Marketing &\nMarket Strategy",
    description: "Enter the market with the right positioning.",
    image: "/images/service-marketing.jpg",
    imageAlt: "Marketing and market strategy",
  },
  {
    number: "04",
    title: "Commercial\nConnections",
    description: "The right opportunity often begins with the right introduction.",
    image: "/images/service-connections.jpg",
    imageAlt: "Commercial connections and partnerships",
  },
  {
    number: "05",
    title: "Hospitality & F&B\n",
    description: "Specialist knowledge for hospitality projects.",
    image: "/images/service-hospitality.jpg",
    imageAlt: "Hospitality and food & beverage consulting",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(gridRef.current?.children ?? [], {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
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
      className="bg-white py-24 md:py-32"
      aria-label="Our services"
    >
      <div className="container-wide">
        {/* Section header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-20 gap-10">
          <div className="flex-1">
            <p className="text-[9px] tracking-[0.25em] text-[#555555] uppercase font-[family-name:var(--font-inter)] mb-6">
              OUR SERVICES
            </p>
            <h2
              className="text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-[#111111] leading-[1.05] tracking-[-0.01em] mb-8"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              One Partner. Multiple Perspectives.
            </h2>
            <div className="w-10 h-[1px] bg-[#222222]" />
          </div>
          <div className="lg:w-[400px] lg:pt-14">
            <p className="text-[13px] text-[#555555] leading-[1.7] font-[family-name:var(--font-inter)]">
              Every business entering a new market faces different challenges. Agency Seven provides strategic guidance and project coordination tailored to each client&apos;s objectives.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {services.map((service, i) => (
            <div
              key={service.number}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[220px] w-full overflow-hidden mb-6 bg-[#f0f0f0]">
                {/* Fallback color while loading or if missing */}
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 pr-4">
                <h3
                  className="text-[#111111] text-[1.4rem] leading-[1.1] mb-4 font-medium whitespace-pre-line"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {service.title}
                </h3>

                <p className="text-[11px] text-[#555555] leading-[1.65] font-[family-name:var(--font-inter)] flex-1 mb-8 max-w-[200px]">
                  {service.description}
                </p>

                <Link
                  href="/services"
                  className="mt-auto inline-flex items-center text-[#555555] group-hover:text-[#111111] group-hover:translate-x-1 transition-all duration-300"
                  aria-label={`Learn more about ${service.title.replace('\n', ' ')}`}
                >
                  <span className="text-[1.2rem] font-light">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
