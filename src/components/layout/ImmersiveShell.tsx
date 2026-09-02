"use client";

import type { ReactNode } from "react";
import { ParticleField } from "@/components/effects/ParticleField";
import { Scanlines } from "@/components/effects/Scanlines";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Global chrome: particles, scanlines, nav, and footer around page content.
 * Extra top padding accounts for the ticker strip under the main bar.
 */
export function ImmersiveShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <ParticleField />
      <Scanlines />
      <Navbar />
      <main className="relative z-10 flex-1 pt-[5.75rem] sm:pt-[6.25rem]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
