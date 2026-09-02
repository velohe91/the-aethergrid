"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { ConnectNodeButton } from "@/components/web3/ConnectNodeButton";
import { MarketTicker } from "@/components/web3/MarketTicker";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-neon-cyan/10 bg-void/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-sans text-xs font-bold tracking-[0.22em] text-neon-cyan text-glow-sm sm:text-sm"
        >
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors xl:px-3 xl:text-xs ${
                  active ? "text-neon-cyan" : "text-muted hover:text-neon-violet"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-neon-cyan shadow-[0_0_8px_#00f0ff]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
          <ConnectNodeButton />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-neon-cyan md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className="font-mono text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <div className="border-t border-neon-cyan/10 px-3 py-1.5">
        <div className="mx-auto flex max-w-7xl justify-end sm:justify-center">
          <MarketTicker />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-neon-cyan/10 md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-3 font-mono text-sm uppercase tracking-widest text-muted hover:text-neon-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
