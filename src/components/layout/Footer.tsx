import { ARCHIVE_LABEL, ARCHIVE_URL, SITE_NAME, SITE_VERSION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-neon-cyan/10 bg-void/80 py-8">
      <div className="mx-auto grid max-w-7xl items-center gap-3 px-4 text-center sm:grid-cols-2 sm:px-6 sm:text-left">
        <p className="font-mono text-xs tracking-widest text-muted sm:justify-self-start">
          {SITE_NAME} {"//"} {SITE_VERSION}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted/80 sm:justify-self-end sm:text-right">
          ARCHIVE {"//"}{" "}
          <a
            href={ARCHIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan/80 hover:text-neon-cyan"
          >
            {ARCHIVE_URL.replace("https://", "")}
          </a>
          <span className="sr-only"> {ARCHIVE_LABEL}</span>
        </p>
      </div>
    </footer>
  );
}
