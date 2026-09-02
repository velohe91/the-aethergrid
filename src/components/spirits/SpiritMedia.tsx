"use client";

import { useState } from "react";
import type { SpiritItem } from "@/lib/types";
import { CorePlaceholder } from "@/components/spirits/CorePlaceholder";

type MediaMode = "still" | "motion";

/**
 * Still image with core-frame fallback. Optional video if the file exists.
 */
export function SpiritMedia({
  spirit,
  showToggle = false,
  className = "",
}: {
  spirit: SpiritItem;
  showToggle?: boolean;
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [mode, setMode] = useState<MediaMode>(
    showToggle && spirit.video ? "motion" : "still",
  );

  const showMotion = Boolean(spirit.video) && !videoFailed && mode === "motion";

  return (
    <div className={`relative aspect-square overflow-hidden bg-void cyber-grid ${className}`}>
      {showMotion && spirit.video ? (
        <video
          key={spirit.video}
          src={spirit.video}
          poster={imageFailed ? undefined : spirit.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={`${spirit.title} — video`}
          onError={() => {
            setVideoFailed(true);
            setMode("still");
          }}
        />
      ) : imageFailed ? (
        <CorePlaceholder spirit={spirit} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={spirit.image}
          alt={spirit.title}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />

      {showToggle && spirit.video && !videoFailed && (
        <div
          className="absolute bottom-3 left-3 z-10 flex gap-1 rounded border border-neon-cyan/30 bg-void/80 p-0.5 font-mono text-[9px] uppercase tracking-wider backdrop-blur-sm"
          role="group"
          aria-label="Media mode"
        >
          <button
            type="button"
            onClick={() => setMode("still")}
            className={`rounded px-2 py-1 transition-colors ${
              mode === "still"
                ? "bg-neon-cyan/20 text-neon-cyan"
                : "text-muted hover:text-foreground"
            }`}
            aria-pressed={mode === "still"}
          >
            Still
          </button>
          <button
            type="button"
            onClick={() => setMode("motion")}
            className={`rounded px-2 py-1 transition-colors ${
              mode === "motion"
                ? "bg-neon-violet/20 text-neon-violet"
                : "text-muted hover:text-foreground"
            }`}
            aria-pressed={mode === "motion"}
          >
            Motion
          </button>
        </div>
      )}
    </div>
  );
}
