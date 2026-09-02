"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Lightweight canvas particle field — cyan + violet cores drifting upward.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    type Particle = {
      x: number;
      y: number;
      r: number;
      speed: number;
      alpha: number;
      drift: number;
      hue: "cyan" | "violet";
    };

    let particles: Particle[] = [];

    const spawn = (randomY = false): Particle => ({
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : window.innerHeight + 4,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.35 + 0.12,
      alpha: Math.random() * 0.5 + 0.15,
      drift: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.45 ? "cyan" : "violet",
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = window.innerWidth < 768 ? 28 : 48;
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -8) Object.assign(p, spawn(false));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "cyan"
            ? `rgba(0, 240, 255, ${p.alpha})`
            : `rgba(168, 85, 247, ${p.alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
