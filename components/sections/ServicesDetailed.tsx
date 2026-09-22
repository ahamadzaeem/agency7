"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const detailedServices = [
  {
    num: "01",
    title: "Business & Market Entry Consulting",
    subtitle: "Understand the market before making the move.",
    description: "We help entrepreneurs and companies evaluate opportunities, understand the UAE business environment and develop a practical strategy for entering or expanding in the market.",
    areas: ["Market assessment", "Opportunity analysis", "Business strategy", "Market-entry planning", "UAE business orientation", "Expansion strategy"]
  },
  {
    num: "02",
    title: "Project Management Consultancy",
    subtitle: "From concept to coordinated execution.",
    description: "We support clients in planning, structuring and coordinating projects, connecting the different parties involved and helping maintain clarity throughout the process.",
    areas: ["Project planning", "Coordination", "Supplier coordination", "Partner coordination", "Development support", "Execution oversight"]
  },
  {
    num: "03",
    title: "Marketing & Market Strategy",
    subtitle: "Enter the market with the right positioning.",
    description: "Understanding a new market requires more than visibility. Agency Seven helps businesses understand their audience, competitors and positioning and develop a marketing strategy appropriate for the UAE.",
    areas: ["Market research", "Competitive analysis", "Positioning", "Go-to-market strategy", "Marketing management", "Brand strategy", "Digital strategy"]
  },
  {
    num: "04",
    title: "Commercial Connections",
    subtitle: "The right opportunity often begins with the right introduction.",
    description: "Through our UAE network and market experience, Agency Seven facilitates commercial connections between businesses, suppliers, partners and potential opportunities.",
    areas: ["Business matching", "Commercial introductions", "Partner identification", "Supplier connections", "Opportunity sourcing"]
  },
  {
    num: "05",
    title: "Hospitality & F&B",
    subtitle: "Specialist knowledge for hospitality projects.",
    description: "Agency Seven can support hospitality and F&B entrepreneurs with project development, supplier coordination, commercial-kitchen requirements and equipment sourcing.",
    areas: []
  }
];

export default function ServicesDetailed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.service-item');
      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
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
        <div className="flex flex-col gap-24 md:gap-32">
          {detailedServices.map((service, i) => (
            <div key={service.num} className="service-item flex flex-col md:flex-row gap-8 md:gap-16 border-t border-[#E5E5E5] pt-12 md:pt-16">
              
              {/* Number */}
              <div className="w-[100px] flex-shrink-0">
                <span 
                  className="text-[3rem] md:text-[4rem] text-[#D8D6D1] leading-none block"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {service.num}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h2 
                  className="text-[2rem] md:text-[2.8rem] text-[#111111] leading-[1.1] mb-4"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {service.title}
                </h2>
                
                <p className="text-[14px] md:text-[16px] text-[#111111] font-medium mb-6 font-[family-name:var(--font-inter)]">
                  {service.subtitle}
                </p>
                
                <p className="text-[13.5px] text-[#555555] leading-[1.8] font-[family-name:var(--font-inter)] max-w-[600px] mb-8">
                  {service.description}
                </p>
                
                {service.areas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {service.areas.map(area => (
                      <span 
                        key={area}
                        className="px-4 py-2 bg-[#F7F6F3] text-[#555555] text-[10.5px] tracking-[0.05em] uppercase font-[family-name:var(--font-inter)]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
