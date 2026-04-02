"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  createParticles,
  createDataPackets,
  createMatrixColumns,
  updateAndDraw,
  type Particle,
  type DataPacket,
  type MatrixColumn,
} from "@/lib/particle-engine";

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const packetsRef = useRef<DataPacket[]>([]);
  const matrixRef = useRef<MatrixColumn[]>([]);
  const scanYRef = useRef({ value: 0 });
  const isVisibleRef = useRef(true);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const isMobile = rect.width < 768;
    const particleCount = isMobile ? 25 : 50;
    const packetCount = isMobile ? 8 : 15;
    const matrixCount = isMobile ? 12 : 25;

    particlesRef.current = createParticles(rect.width, rect.height, particleCount);
    packetsRef.current = createDataPackets(packetCount, particleCount);
    matrixRef.current = createMatrixColumns(rect.width, matrixCount);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    init();

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Intersection Observer — pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    let time = 0;
    const animate = () => {
      if (isVisibleRef.current) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const rect = canvas.getBoundingClientRect();
          updateAndDraw(
            ctx,
            rect.width,
            rect.height,
            particlesRef.current,
            packetsRef.current,
            matrixRef.current,
            scanYRef.current,
            time
          );
          time++;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
