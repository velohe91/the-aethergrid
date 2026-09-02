/**
 * Soft neon ambient orbs for depth behind content.
 */
export function GlowOrb({
  className = "",
  color = "cyan",
}: {
  className?: string;
  color?: "cyan" | "violet";
}) {
  const bg = color === "cyan" ? "bg-neon-cyan/20" : "bg-neon-violet/25";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${bg} ${className}`}
    />
  );
}
