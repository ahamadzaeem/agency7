"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function RevealText({
  children,
  className = "",
  delay = 0,
  tag: Tag = "div",
}: RevealTextProps) {
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        clipPath: "inset(0 0 100% 0)",
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={wrapRef} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </Tag>
  );
}
