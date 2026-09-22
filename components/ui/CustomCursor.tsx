"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let targetX = -100;
    let targetY = -100;
    let curX = -100;
    let curY = -100;
    let rafId: number;

    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Immediate response for small dot
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    };

    const animateCursor = () => {
      // Smooth lerp for outer ring
      curX += (targetX - curX) * 0.2;
      curY += (targetY - curY) * 0.2;
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      rafId = requestAnimationFrame(animateCursor);
    };

    const onMouseEnter = () => {
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(1.8)`;
      cursor.style.borderColor = "#111111";
    };

    const onMouseLeave = () => {
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(1)`;
      cursor.style.borderColor = "#666666";
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

    const interactiveEls = document.querySelectorAll("a, button, input, textarea, [role='button']");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafId);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] w-7 h-7 rounded-full border border-[#888888] -mt-3.5 -ml-3.5 transition-transform duration-150 ease-out hidden md:block"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-[#111111] -mt-[3px] -ml-[3px] hidden md:block"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
