import { GLOBE_RADIUS } from "./globeConfig";

/**
 * Convert geographic latitude/longitude to a 3D point on a sphere.
 */
export function latLonToXYZ(
  lat: number,
  lon: number,
  radius: number = GLOBE_RADIUS
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
}

/**
 * Convert degrees to radians.
 */
export function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}
