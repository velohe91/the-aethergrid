"use client";

import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { PageTransition } from "@/components/ui/PageTransition";
import { NeonButton } from "@/components/ui/NeonButton";

const STATUS = [
  { k: "NODE", v: "GRID-01" },
  { k: "STATUS", v: "IN DEVELOPMENT" },
  { k: "LAYER", v: "EXECUTABLE" },
  { k: "SYNC", v: "PENDING" },
  { k: "SPIRITS", v: "5 CORES INDEXED" },
];

export default function ProtocolPage() {
  return (
    <PageTransition>
      <section className="relative flex min-h-[calc(100dvh-7rem)] flex-col items-center justify-center overflow-hidden px-4 py-16">
        <GlowOrb className="-left-16 top-24 h-64 w-64" color="violet" />
        <GlowOrb className="-right-12 bottom-20 h-72 w-72" color="cyan" />

        <div className="relative z-10 w-full max-w-xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon-violet">
            PROTOCOL {"//"} IN DEVELOPMENT
          </p>
          <h1 className="mt-4 font-sans text-3xl font-bold tracking-[0.18em] text-glow sm:text-5xl">
            AETHERGRID
          </h1>
          <p className="mx-auto mt-5 max-w-md font-mono text-sm leading-relaxed text-muted">
            The Aethergrid is an executable layer — Spirit cores will
            synchronize here.
          </p>

          <div className="mx-auto mt-10 w-full max-w-md rounded-md border border-neon-violet/25 bg-panel/70 p-5 text-left font-mono text-xs sm:text-sm">
            {STATUS.map((row, i) => (
              <motion.p
                key={row.k}
                className="flex justify-between gap-4 border-b border-neon-cyan/10 py-2 last:border-0"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 * i }}
              >
                <span className="tracking-[0.2em] text-muted">{row.k}</span>
                <span
                  className={
                    row.v.includes("DEVELOPMENT") || row.v.includes("PENDING")
                      ? "text-neon-violet"
                      : "text-neon-cyan"
                  }
                >
                  {row.v}
                </span>
              </motion.p>
            ))}
          </div>

          <p className="mt-6 font-mono text-[11px] tracking-widest text-muted/70">
            No executable session in this phase.
          </p>

          <div className="mt-8">
            <NeonButton href="/spirits" variant="outline">
              Return to Spirits
            </NeonButton>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
