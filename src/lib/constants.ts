/**
 * App-wide constants: routes, branding, and chrome copy.
 */

export const SITE_NAME = "THE AETHERGRID";
export const SITE_TAGLINE = "Grid Node // Protocol in Development";
export const SITE_VERSION = "GRID NODE";

export const ARCHIVE_URL = "https://velohesystem.com";
export const ARCHIVE_LABEL = "VΣLOHE SYSTEM";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/spirits", label: "Spirits" },
  { href: "/protocol", label: "Protocol" },
] as const;

export const RARITY_COLORS: Record<string, string> = {
  common: "text-slate-300 border-slate-500/50",
  rare: "text-violet-300 border-violet-400/60",
  epic: "text-amber-300 border-amber-400/60",
  legendary: "text-fuchsia-300 border-fuchsia-400/60",
  mythic: "text-cyan-300 border-cyan-300/80",
};

