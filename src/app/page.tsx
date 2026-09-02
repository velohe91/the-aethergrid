"use client";

import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { AnimatedLogo } from "@/components/home/AnimatedLogo";
import { SystemBootSequence } from "@/components/home/SystemBootSequence";
import { NeonButton } from "@/components/ui/NeonButton";
import { ARCHIVE_LABEL, ARCHIVE_URL, SITE_TAGLINE } from "@/lib/constants";

/**
 * Boot-style landing — sister to VΣLOHE home, not a copy.
 */
export default function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100dvh-7rem)] flex-col items-center justify-center overflow-hidden px-4 py-16">
      <GlowOrb className="-left-20 top-20 h-72 w-72" color="cyan" />
      <GlowOrb className="-right-16 bottom-24 h-80 w-80" color="violet" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          className="mb-4 font-mono text-[10px] uppercase tracking-[0.45em] text-muted sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {SITE_TAGLINE}
        </motion.p>

        <AnimatedLogo />

        <motion.p
          className="mt-5 max-w-lg font-mono text-xs leading-relaxed text-muted sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          External grid node. Spirit cores and protocol layers — synchronized
          under Web 3.0.
        </motion.p>

        <SystemBootSequence />

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.4 }}
        >
          <NeonButton href="/spirits">Enter Spirits</NeonButton>
          <NeonButton href="/protocol" variant="violet">
            Open Protocol
          </NeonButton>
        </motion.div>

        <motion.a
          href={ARCHIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 font-mono text-[11px] tracking-widest text-muted/80 transition-colors hover:text-neon-cyan"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.4 }}
        >
          {ARCHIVE_LABEL} archive → velohesystem.com
        </motion.a>
      </div>
    </section>
  );
}
