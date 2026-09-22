// Globe configuration constants

export const GLOBE_RADIUS = 1.4;

export const GLOBE_CONFIG = {
  radius: GLOBE_RADIUS,
  rotationSpeed: 0.0012, // Smooth, elegant rotation speed
  dragDamping: 0.94,
  autoRotateDelay: 1200,
} as const;

export const FIBONACCI_COUNTS = {
  desktop: 18000,
  tablet: 12000,
  mobile: 7500,
} as const;

export const DOT_CONFIG = {
  // Front-facing dots — crisp dark charcoal (#1C1C1C)
  frontColor: [0.11, 0.11, 0.11] as [number, number, number],
  // Rear-facing dots — warm translucent gray (#C4C2BB)
  rearColor: [0.77, 0.76, 0.73] as [number, number, number],
} as const;

export const INITIAL_ROTATION = {
  y: -0.4,
  x: 0.15,
} as const;
