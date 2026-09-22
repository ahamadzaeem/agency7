"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLOBE_CONFIG, INITIAL_ROTATION } from "@/lib/globe/globeConfig";

interface GlobeInteractionProps {
  groupRef: React.RefObject<THREE.Group>;
  canvasRef: React.RefObject<HTMLElement>;
}

export default function GlobeInteraction({ groupRef, canvasRef }: GlobeInteractionProps) {
  const rotationY = useRef<number>(INITIAL_ROTATION.y);
  const rotationX = useRef<number>(INITIAL_ROTATION.x);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const dragVelocity = useRef(0);
  const autoRotateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoRotating = useRef(true);
  const [, setReducedMotion] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    setReducedMotion(mq.matches);
    if (mq.matches) {
      isAutoRotating.current = false;
    }
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) isAutoRotating.current = false;
      else isAutoRotating.current = true;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const startDrag = useCallback((clientX: number) => {
    isDragging.current = true;
    isAutoRotating.current = false;
    lastPointerX.current = clientX;
    dragVelocity.current = 0;
    if (autoRotateTimer.current) clearTimeout(autoRotateTimer.current);
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    const delta = clientX - lastPointerX.current;
    dragVelocity.current = delta * 0.005;
    lastPointerX.current = clientX;
  }, []);

  const endDrag = useCallback(() => {
    isDragging.current = false;
    // Resume auto-rotation after delay (unless reduced motion)
    if (!reducedMotionRef.current) {
      autoRotateTimer.current = setTimeout(() => {
        isAutoRotating.current = true;
      }, GLOBE_CONFIG.autoRotateDelay);
    }
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => startDrag(e.clientX);
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
    const onMouseUp = () => endDrag();

    const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => moveDrag(e.touches[0].clientX);
    const onTouchEnd = () => endDrag();

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (autoRotateTimer.current) clearTimeout(autoRotateTimer.current);
    };
  }, [canvasRef, startDrag, moveDrag, endDrag]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    if (isDragging.current) {
      // Apply drag
      rotationY.current += dragVelocity.current;
      // Clamp X rotation (no vertical drag for now)
      const clampedX = THREE.MathUtils.clamp(
        rotationX.current,
        -Math.PI * 0.25,
        Math.PI * 0.25
      );
      rotationX.current = clampedX;
      dragVelocity.current *= GLOBE_CONFIG.dragDamping;
    } else {
      // Apply inertia from drag
      if (Math.abs(dragVelocity.current) > 0.0001) {
        rotationY.current += dragVelocity.current;
        dragVelocity.current *= GLOBE_CONFIG.dragDamping;
      }

      // Auto-rotate
      if (isAutoRotating.current) {
        rotationY.current += GLOBE_CONFIG.rotationSpeed;
      }
    }

    // Apply to group
    group.rotation.y = rotationY.current;
    group.rotation.x = rotationX.current;
  });

  return null;
}
