"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { SpiritItem } from "@/lib/types";
import { RARITY_COLORS } from "@/lib/constants";

function subscribe() {
  return () => {};
}
function clientSnapshot() {
  return true;
}
function serverSnapshot() {
  return false;
}

type Props = {
  spirit: SpiritItem | null;
  onClose: () => void;
};

function getMotionKind(src?: string): "gif" | "video" | null {
  if (!src) return null;
  if (/\.gif(\?|#|$)/i.test(src)) return "gif";
  if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(src)) return "video";
  return "video";
}

export function SpiritModal({ spirit, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  useEffect(() => {
    if (!spirit) return;

    const prev = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      if (contentRef.current) contentRef.current.scrollTop = 0;
      if (dialogRef.current) dialogRef.current.scrollTop = 0;
      closeRef.current?.focus({ preventScroll: true });
    }, 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [spirit, onClose]);

  if (!mounted) return null;

  const rarityClass = spirit
    ? RARITY_COLORS[spirit.rarity] ?? RARITY_COLORS.common
    : "";
  const spiritNumber = spirit?.id.match(/(\d+)$/)?.[1];
  const staticImage =
    spiritNumber && Number(spiritNumber) >= 1 && Number(spiritNumber) <= 22
      ? `/spirits/images/${spiritNumber.padStart(3, "0")}.png`
      : spirit?.image;
  const motionKind = spirit ? getMotionKind(spirit.video) : null;
  const showMotion = Boolean(spirit?.video);

  return createPortal(
    <AnimatePresence>
      {spirit && (
        <motion.div
          key={spirit.id}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-void/85 backdrop-blur-sm"
            aria-label="Close modal"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-xl border border-neon-cyan/30 bg-panel box-glow-strong sm:rounded-xl"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid min-h-0 gap-0 md:grid-cols-2">
              <div className="relative aspect-square shrink-0 overflow-hidden bg-void cyber-grid md:min-h-[320px]">
                {showMotion && motionKind === "gif" && spirit.video ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={spirit.video}
                    src={spirit.video}
                    alt={`${spirit.title} — animation`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : showMotion && motionKind === "video" && spirit.video ? (
                  <video
                    key={spirit.video}
                    src={spirit.video}
                    poster={staticImage}
                    autoPlay
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-label={`${spirit.title} — video`}
                  />
                ) : (
                  <Image
                    key={staticImage}
                    src={staticImage ?? spirit.image}
                    alt={`${spirit.title} — still`}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>

              <div
                ref={contentRef}
                key={`scroll-${spirit.id}`}
                className="flex min-h-0 max-h-[50dvh] flex-col overflow-y-auto p-5 sm:max-h-none sm:p-6 md:max-h-[70dvh]"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs tracking-widest text-neon-cyan">
                    {spirit.id}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase ${rarityClass}`}
                  >
                    {spirit.rarity}
                  </span>
                </div>

                <h2
                  id={titleId}
                  className="font-sans text-xl font-bold tracking-wide text-glow-sm sm:text-2xl"
                >
                  {spirit.title}
                </h2>

                <p className="mt-2 font-mono text-sm leading-relaxed text-muted">
                  {spirit.description}
                </p>

                <dl className="mt-3 grid grid-cols-2 gap-2 font-mono text-[11px] text-muted">
                  <dt className="text-neon-cyan/70">Series</dt>
                  <dd>{spirit.series}</dd>
                  <dt className="text-neon-violet/80">System Phase</dt>
                  <dd>{spirit.status}</dd>
                  <dt className="text-neon-cyan/70">Year</dt>
                  <dd>{spirit.year}</dd>
                  <dt className="text-neon-violet/80">Core</dt>
                  <dd className="capitalize">{spirit.core}</dd>
                </dl>

                <div className="mt-5 border-t border-neon-cyan/15 pt-4">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan/80">
                    Lore
                  </p>
                  <p className="whitespace-pre-line font-mono text-sm leading-relaxed text-foreground/90">
                    {spirit.lore}
                  </p>
                </div>

                {spirit.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {spirit.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded border border-neon-violet/25 px-2 py-0.5 font-mono text-[10px] text-muted"
                      >
                        #{tag}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  {spirit.marketplace && (
                    <a
                      href={spirit.marketplace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-md border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 font-sans text-sm uppercase tracking-[0.2em] text-neon-cyan transition-colors hover:border-neon-cyan hover:bg-neon-cyan/20 sm:w-auto"
                    >
                      OpenSea
                    </a>
                  )}
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="inline-flex w-full items-center justify-center rounded-md border border-neon-violet/40 px-6 py-3 font-sans text-sm uppercase tracking-[0.2em] text-neon-violet transition-colors hover:border-neon-cyan hover:text-neon-cyan sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
