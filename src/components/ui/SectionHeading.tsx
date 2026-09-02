"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.header
      className="mb-10 max-w-3xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-neon-cyan/80">
          {eyebrow}
        </p>
      )}
      <h1 className="font-sans text-3xl font-bold tracking-wider text-glow sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 whitespace-pre-line font-mono text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
