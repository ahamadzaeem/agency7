"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Preloader() {
  const [isReady, setIsReady] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We want the preloader to block the screen until the main heavy components (like Globe) are ready.
    // In a real app we might listen for a global event, but for now we'll wait a fixed optimal time
    // that allows the Next.js hydration and Three.js initialization to finish without jarring the user.
    
    const timer = setTimeout(() => {
      if (!preloaderRef.current) return;

      // Premium reveal animation
      gsap.to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.0,
        ease: "power4.inOut",
        onComplete: () => setIsReady(true)
      });

    }, 1800); // Wait 1.8 seconds for smooth entrance

    return () => clearTimeout(timer);
  }, []);

  if (isReady) return null;

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F6F3]"
    >
      <div className="relative h-16 w-64 md:h-20 md:w-[340px]">
        <Image
          src="/images/agency7-logo.png"
          alt="The Agency 7 Logo"
          fill
          className="object-contain object-center opacity-80"
          priority
          sizes="(max-width: 768px) 256px, 340px"
        />
      </div>
      <div className="mt-8 flex gap-2 items-center">
        <div className="w-1.5 h-1.5 bg-[#111111] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-1.5 h-1.5 bg-[#111111] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-1.5 h-1.5 bg-[#111111] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
