"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLOBE_RADIUS, DOT_CONFIG } from "@/lib/globe/globeConfig";
import { latLonToXYZ } from "@/lib/globe/geoToSphere";
import { getFibonacciCount } from "@/lib/globe/sampleCountries";

// ─── Vertex Shader ────────────────────────────────────────────────────────────
const vertexShader = `
  uniform vec3 uCameraPosition;
  attribute float aSize;
  varying float vFacing;

  void main() {
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 normal = normalize(worldPos);
    vec3 toCamera = normalize(uCameraPosition - worldPos);
    float facing = dot(normal, toCamera);

    vFacing = clamp(facing, 0.0, 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float sizeMult = mix(0.45, 1.0, vFacing);
    gl_PointSize = aSize * sizeMult * (18.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// ─── Fragment Shader ───────────────────────────────────────────────────────────
const fragmentShader = `
  uniform vec3 uFrontColor;
  uniform vec3 uRearColor;
  varying float vFacing;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    if (dist > 0.5) discard;

    float edgeAlpha = smoothstep(0.5, 0.35, dist);
    float opacity = mix(0.18, 0.95, vFacing);
    float alpha = edgeAlpha * opacity;

    vec3 color = mix(uRearColor, uFrontColor, vFacing);
    gl_FragColor = vec4(color, alpha);
  }
`;

interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: unknown;
  } | null;
}

export interface GeoJSONData {
  features: GeoJSONFeature[];
}

/**
 * High-performance Fibonacci sphere land sampler using latLonToXYZ coordinates (< 3ms)
 */
function buildFibonacciGlobe(
  geojson: GeoJSONData | null,
  totalCandidates: number
): Float32Array {
  const radius = GLOBE_RADIUS;
  const phiGolden = (1 + Math.sqrt(5)) / 2;

  let maskData: Uint8ClampedArray | null = null;
  const MASK_W = 1024;
  const MASK_H = 512;

  if (geojson && typeof document !== "undefined") {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = MASK_W;
      canvas.height = MASK_H;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, MASK_W, MASK_H);
        ctx.fillStyle = "#ffffff";

        for (const feature of geojson.features) {
          if (!feature.geometry) continue;

          let polyList: number[][][][] = [];
          if (feature.geometry.type === "MultiPolygon") {
            polyList = feature.geometry.coordinates as number[][][][];
          } else if (feature.geometry.type === "Polygon") {
            polyList = [(feature.geometry.coordinates as number[][][])];
          }

          for (const poly of polyList) {
            if (!poly || poly.length === 0) continue;
            const ring = poly[0];
            if (!ring || ring.length < 3) continue;

            ctx.beginPath();
            for (let i = 0; i < ring.length; i++) {
              const lon = ring[i][0];
              const lat = ring[i][1];
              const px = ((lon + 180) / 360) * MASK_W;
              const py = ((90 - lat) / 180) * MASK_H;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
          }
        }
        maskData = ctx.getImageData(0, 0, MASK_W, MASK_H).data;
      }
    } catch {
      maskData = null;
    }
  }

  const positions: number[] = [];

  for (let i = 0; i < totalCandidates; i++) {
    const yVal = 1 - (i / (totalCandidates - 1)) * 2;
    const lat = Math.asin(Math.min(1, Math.max(-1, yVal))) * (180 / Math.PI);

    const theta = (2 * Math.PI * i) / phiGolden;
    const lon = ((((theta % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI)) * (180 / Math.PI)) - 180;

    if (maskData) {
      const px = Math.floor(((lon + 180) / 360) * MASK_W);
      const py = Math.floor(((90 - lat) / 180) * MASK_H);
      const idx = (Math.min(py, MASK_H - 1) * MASK_W + Math.min(px, MASK_W - 1)) * 4;

      if (maskData[idx] <= 128) {
        continue;
      }
    }

    const [x, y, z] = latLonToXYZ(lat, lon, radius);
    positions.push(x, y, z);
  }

  return new Float32Array(positions);
}

interface GlobeParticlesProps {
  geojson: GeoJSONData | null;
}

export default function GlobeParticles({ geojson }: GlobeParticlesProps) {
  const { camera } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  if (!materialRef.current) {
    materialRef.current = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uCameraPosition: { value: new THREE.Vector3(0, 0, 4.4) },
        uFrontColor: { value: new THREE.Vector3(...DOT_CONFIG.frontColor) },
        uRearColor: { value: new THREE.Vector3(...DOT_CONFIG.rearColor) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }

  const geometry = useMemo(() => {
    const candidateCount = getFibonacciCount();
    const positions = buildFibonacciGlobe(geojson, candidateCount);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const sizes = new Float32Array(positions.length / 3);
    for (let i = 0; i < sizes.length; i++) {
      sizes[i] = 1.4 + (i % 5 === 0 ? 0.6 : i % 3 === 0 ? 0.3 : 0);
    }
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    return geo;
  }, [geojson]);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uCameraPosition.value.copy(camera.position);
    }
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return <points geometry={geometry} material={materialRef.current!} />;
}
