import type { SpiritItem } from "@/lib/types";

const CORE_FILL: Record<SpiritItem["core"], { a: string; b: string }> = {
  cyan: { a: "#00f0ff", b: "#67e8f9" },
  purple: { a: "#a855f7", b: "#c084fc" },
  gold: { a: "#f5c542", b: "#fde68a" },
  void: { a: "#ef4444", b: "#7f1d1d" },
  dual: { a: "#00f0ff", b: "#a855f7" },
};

/**
 * SVG core frame used when /spirits/images/AGS0N.png is missing.
 */
export function CorePlaceholder({
  spirit,
  className = "",
}: {
  spirit: SpiritItem;
  className?: string;
}) {
  const fill = CORE_FILL[spirit.core];
  const gid = `core-${spirit.code}`;

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center bg-void cyber-grid ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 320" className="h-full w-full p-8">
        <defs>
          <radialGradient id={gid} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor={fill.a} stopOpacity="0.95" />
            <stop offset="55%" stopColor={fill.b} stopOpacity="0.45" />
            <stop offset="100%" stopColor="#03050a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx="160"
          cy="160"
          r="118"
          fill="none"
          stroke={fill.a}
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <circle
          cx="160"
          cy="160"
          r="88"
          fill="none"
          stroke={fill.b}
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle cx="160" cy="160" r="62" fill={`url(#${gid})`} />
        {spirit.core === "dual" && (
          <>
            <circle cx="132" cy="160" r="18" fill="#00f0ff" opacity="0.9" />
            <circle cx="188" cy="160" r="18" fill="#a855f7" opacity="0.9" />
          </>
        )}
        <text
          x="160"
          y="292"
          textAnchor="middle"
          fill={fill.a}
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          letterSpacing="4"
        >
          {spirit.code}
        </text>
      </svg>
    </div>
  );
}
