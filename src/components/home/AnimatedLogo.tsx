"use client";

import { motion } from "framer-motion";
import { SITE_NAME } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Display wordmark — Orbitron, stacked THE / AETHERGRID with cyan–violet glow.
 */
export function AnimatedLogo() {
  const reduced = usePrefersReducedMotion();

  return (
    <h1
      className="font-sans select-none text-center font-semibold"
      style={{
        fontFamily: "var(--font-orbitron), ui-sans-serif, system-ui, sans-serif",
      }}
      aria-label={SITE_NAME}
    >
      <motion.span
        className="block text-[0.7rem] tracking-[0.6em] text-muted sm:text-sm"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        THE
      </motion.span>
      <span className="mt-1 block text-[clamp(1.6rem,8vw,4.6rem)] leading-[0.95] tracking-[0.12em] text-neon-cyan text-glow">
        {"AETHERGRID".split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block"
            initial={
              reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: reduced ? 0 : 0.04 * i,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={
              i >= 6
                ? {
                    color: "#c4b5fd",
                    textShadow:
                      "0 0 8px rgba(168, 85, 247, 0.7), 0 0 20px rgba(0, 240, 255, 0.25)",
                  }
                : undefined
            }
          >
            {char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}
