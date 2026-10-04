"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SpiritItem } from "@/lib/types";
import { RARITY_COLORS } from "@/lib/constants";

type Props = {
  spirit: SpiritItem;
  index: number;
  onOpen: (spirit: SpiritItem) => void;
};

export function SpiritCard({ spirit, index, onOpen }: Props) {
  const rarityClass = RARITY_COLORS[spirit.rarity] ?? RARITY_COLORS.common;
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const spiritNumber = spirit.id.match(/(\d+)$/)?.[1];
  const staticImage =
    spiritNumber && Number(spiritNumber) >= 1 && Number(spiritNumber) <= 22
      ? `/spirits/images/${spiritNumber.padStart(3, "0")}.png`
      : spirit.image;
  const showMobileVideo = isMobile && Boolean(spirit.video);
  const showDesktopVideo = !isMobile && Boolean(spirit.video) && isHovered;
  const showVideo = showMobileVideo || showDesktopVideo;

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(spirit)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative z-0 flex w-full flex-col overflow-hidden rounded-lg border border-neon-cyan/20 bg-panel/80 text-left hologram-border box-glow transition-shadow hover:box-glow-strong focus-visible:outline-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.06, 0.4), duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative aspect-square overflow-hidden bg-void cyber-grid">
        <Image
          src={staticImage}
          alt={spirit.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
          priority={index < 4}
        />

        {spirit.video && showVideo && (
          <video
            key={spirit.video}
            src={spirit.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            aria-label={`${spirit.title} — preview`}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-[10px] tracking-widest text-neon-cyan">
            {spirit.id}
          </span>
          <span
            className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${rarityClass}`}
          >
            {spirit.rarity}
          </span>
        </div>
        <h3 className="font-sans text-sm font-semibold tracking-wide text-foreground sm:text-base">
          {spirit.title}
        </h3>
        <p className="line-clamp-2 font-mono text-[11px] leading-relaxed text-muted">
          {spirit.description}
        </p>
        <div className="mt-auto flex flex-col gap-1 pt-1 font-mono text-[10px] tracking-wide text-muted/80">
          <p className="uppercase tracking-widest text-neon-violet/80">
            {spirit.series}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span>{spirit.status}</span>
            <span className="text-muted/50" aria-hidden>
              ·
            </span>
            <span>{spirit.year}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
