"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current?.children ?? [], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section className="py-24 md:py-32 bg-white" ref={containerRef}>
      <div className="container-wide max-w-[800px] mx-auto">
        <div className="mb-16">
          <h2 
            className="text-[2.5rem] md:text-[3.5rem] text-[#111111] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Let&apos;s discuss your project.
          </h2>
          <p className="text-[14px] text-[#555555] font-[family-name:var(--font-inter)] leading-[1.8] max-w-[500px]">
            Whether you are exploring the UAE for the first time, expanding an existing company or developing a new project, Agency Seven can help you understand the opportunity and determine the next steps.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-[#F7F6F3] p-12 text-center border border-[#D8D6D1]">
            <h3 
              className="text-[2rem] text-[#111111] mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Thank you.
            </h3>
            <p className="text-[13px] text-[#555555] font-[family-name:var(--font-inter)]">
              Your message has been received. We will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[10px] tracking-[0.1em] uppercase text-[#777777] font-[family-name:var(--font-inter)]">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="border-b border-[#D8D6D1] bg-transparent pb-3 text-[#111111] text-[14px] font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-[10px] tracking-[0.1em] uppercase text-[#777777] font-[family-name:var(--font-inter)]">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  className="border-b border-[#D8D6D1] bg-transparent pb-3 text-[#111111] text-[14px] font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="country" className="text-[10px] tracking-[0.1em] uppercase text-[#777777] font-[family-name:var(--font-inter)]">Country</label>
                <input 
                  type="text" 
                  id="country" 
                  required
                  className="border-b border-[#D8D6D1] bg-transparent pb-3 text-[#111111] text-[14px] font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact" className="text-[10px] tracking-[0.1em] uppercase text-[#777777] font-[family-name:var(--font-inter)]">Email / WhatsApp</label>
                <input 
                  type="text" 
                  id="contact" 
                  required
                  className="border-b border-[#D8D6D1] bg-transparent pb-3 text-[#111111] text-[14px] font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="interest" className="text-[10px] tracking-[0.1em] uppercase text-[#777777] font-[family-name:var(--font-inter)]">Area of Interest</label>
              <select 
                id="interest" 
                className="border-b border-[#D8D6D1] bg-transparent pb-3 text-[#111111] text-[14px] font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#111111] transition-colors appearance-none rounded-none"
              >
                <option value="" disabled selected>Select an area</option>
                <option value="market_entry">Business & Market Entry</option>
                <option value="project_management">Project Management</option>
                <option value="marketing">Marketing & Strategy</option>
                <option value="commercial">Commercial Connections</option>
                <option value="hospitality">Hospitality & F&B</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="project" className="text-[10px] tracking-[0.1em] uppercase text-[#777777] font-[family-name:var(--font-inter)]">Tell us briefly about your project</label>
              <textarea 
                id="project" 
                rows={4}
                required
                className="border-b border-[#D8D6D1] bg-transparent py-3 text-[#111111] text-[14px] font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#111111] transition-colors resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={status === "submitting"}
              className="mt-8 bg-[#111111] text-[#F7F6F3] py-5 px-8 text-[11px] tracking-[0.15em] uppercase font-[family-name:var(--font-inter)] hover:bg-[#333333] transition-colors duration-300 w-full md:w-auto md:self-start disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {status === "submitting" ? "Sending..." : "Start the Conversation"}
              <span className="text-[12px] transform transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
