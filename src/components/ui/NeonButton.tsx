"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost" | "outline" | "violet";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-sans text-sm uppercase tracking-[0.2em] transition-colors focus-visible:outline-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid:
    "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan/25 box-glow",
  violet:
    "bg-neon-violet/15 text-neon-violet border border-neon-violet/50 hover:bg-neon-violet/25",
  ghost: "text-neon-cyan/90 hover:text-neon-cyan hover:bg-neon-cyan/10",
  outline:
    "border border-neon-violet/40 text-neon-violet hover:border-neon-cyan hover:text-neon-cyan",
};

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
  external?: boolean;
};

export function NeonButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
  external,
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 22 },
  };

  if (href) {
    if (external) {
      return (
        <motion.div {...motionProps} className="inline-flex">
          <a
            href={href}
            className={classes}
            aria-label={ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        </motion.div>
      );
    }

    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link href={href} className={classes} aria-label={ariaLabel}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
