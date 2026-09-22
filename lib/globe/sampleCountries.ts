import { FIBONACCI_COUNTS } from "./globeConfig";

/**
 * Determine particle candidate count based on device screen width.
 */
export function getFibonacciCount(): number {
  if (typeof window === "undefined") return FIBONACCI_COUNTS.desktop;
  const w = window.innerWidth;
  if (w >= 1024) return FIBONACCI_COUNTS.desktop;
  if (w >= 768) return FIBONACCI_COUNTS.tablet;
  return FIBONACCI_COUNTS.mobile;
}
