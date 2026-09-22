"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { feature } from "topojson-client";
import world from "world-atlas/countries-50m.json";

type Point = {
  position: [number, number, number];
  depth: number;
};

const RADIUS = 2.1;

/**
 * Convert latitude / longitude into a 3D position.
 */
function latLngToSphere(
  latitude: number,
  longitude: number,
  radius: number
): [number, number, number] {
  const lat = THREE.MathUtils.degToRad(latitude);
  const lon = THREE.MathUtils.degToRad(longitude);

  const x = radius * Math.cos(lat) * Math.sin(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.cos(lon);

  return [x, y, z];
}

/**
 * Creates points from ACTUAL country polygons with instant GPU/Canvas rasterization (< 2ms).
 */
function generateCountryPoints(): Point[] {
  // Extract GeoJSON features from TopoJSON
  const worldData = world as unknown as { objects: { countries: unknown } };
  const countries = feature(worldData as never, worldData.objects.countries as never) as unknown as { features: { geometry: { type: string; coordinates: unknown } | null }[] };

  const MASK_W = 512;
  const MASK_H = 256;
  let maskData: Uint8ClampedArray | null = null;

// ... keeping the rest of the canvas logic the same ...

  if (typeof document !== "undefined") {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = MASK_W;
      canvas.height = MASK_H;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, MASK_W, MASK_H);
        ctx.fillStyle = "#ffffff";

        for (const feat of countries.features) {
          if (!feat.geometry) continue;

          let polyList: number[][][][] = [];
          if (feat.geometry.type === "MultiPolygon") {
            polyList = feat.geometry.coordinates as number[][][][];
          } else if (feat.geometry.type === "Polygon") {
            polyList = [(feat.geometry.coordinates as number[][][])];
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

  const points: Point[] = [];
  const STEP = 0.85;

  for (let latitude = -89.5; latitude <= 89.5; latitude += STEP) {
    for (let longitude = -180; longitude <= 180; longitude += STEP) {
      if (maskData) {
        const px = Math.floor(((longitude + 180) / 360) * MASK_W);
        const py = Math.floor(((90 - latitude) / 180) * MASK_H);
        const idx = (Math.min(py, MASK_H - 1) * MASK_W + Math.min(px, MASK_W - 1)) * 4;

        if (maskData[idx] <= 128) {
          continue; // Skip ocean point
        }
      }

      const [x, y, z] = latLngToSphere(latitude, longitude, RADIUS);
      const length = Math.sqrt(x * x + y * y + z * z);
      const depth = z / length;

      points.push({
        position: [x, y, z],
        depth,
      });
    }
  }

  return points;
}

function DottedCountryMaterial() {
  return (
    <shaderMaterial
      transparent
      depthWrite={false}
      uniforms={{
        uColor: {
          value: new THREE.Color("#2A2927"),
        },
      }}
      vertexShader={`
        uniform vec3 uColor;
        varying float vDepth;

        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vec4 mvPosition = viewMatrix * worldPosition;

          vec3 normal = normalize(position);
          vec3 viewDirection = normalize(cameraPosition - worldPosition.xyz);

          vDepth = max(0.0, dot(normal, viewDirection));

          /* Crisp square particles */
          gl_PointSize = mix(1.6, 3.4, vDepth);
          gl_Position = projectionMatrix * mvPosition;
        }
      `}
      fragmentShader={`
        uniform vec3 uColor;
        varying float vDepth;

        void main() {
          vec2 p = gl_PointCoord - vec2(0.5);

          /* Convert circular point into a refined square point */
          float square = step(max(abs(p.x), abs(p.y)), 0.47);

          if (square < 0.5) {
            discard;
          }

          float opacity = mix(0.12, 0.95, vDepth);

          gl_FragColor = vec4(uColor, opacity);
        }
      `}
    />
  );
}

/**
 * Actual 3D Globe Mesh.
 */
function GlobeMesh() {
  const group = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    return generateCountryPoints();
  }, []);

  const positions = useMemo(() => {
    const array = new Float32Array(points.length * 3);

    points.forEach((point, index) => {
      array[index * 3] = point.position[0];
      array[index * 3 + 1] = point.position[1];
      array[index * 3 + 2] = point.position[2];
    });

    return array;
  }, [points]);

  useFrame(() => {
    if (!group.current) return;
    /* Slow luxury-style rotation */
    group.current.rotation.y += 0.00065;
  });

  return (
    <group
      ref={group}
      rotation={[
        THREE.MathUtils.degToRad(4),
        THREE.MathUtils.degToRad(-25),
        0,
      ]}
    >
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>

        <DottedCountryMaterial />
      </points>

      {/* Extremely subtle sphere boundary */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.012, 64, 64]} />
        <meshBasicMaterial
          color="#d8d6d1"
          transparent
          opacity={0.045}
          wireframe
        />
      </mesh>
    </group>
  );
}

/**
 * Main 3D Globe Component.
 */
export default function DottedGlobe() {
  return (
    <div
      className="relative h-full w-full select-none"
      aria-label="Interactive 3D dotted world globe"
    >
      <Canvas
        camera={{
          position: [0, 0, 8.5],
          fov: 32,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <GlobeMesh />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.3}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}
