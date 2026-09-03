"use client";

import { useEffect, useMemo, useState } from "react";
import type { MarketPricesResponse } from "@/lib/types";

const POLL_MS = 45_000;

type TokenChip = {
  key: "eth";
  label: string;
  value: number | null;
  source: string;
  className: string;
};

function formatUsd(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "---";
  const digits = value < 1 ? 4 : 2;

  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

function chipTone(
  status: "loading" | "ok" | "error",
  value: number | null,
  okClass: string,
): string {
  if (status === "error" || value == null) {
    return "border-neon-blue/20 text-muted";
  }

  return okClass;
}

/**
 * Compact ETH market chip.
 * Polls /api/market/prices every 45s.
 */
export function MarketTicker() {
  const [data, setData] = useState<MarketPricesResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/market/prices", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`http_${res.status}`);

        const json = (await res.json()) as MarketPricesResponse;

        if (!cancelled) {
          setData(json);
          setStatus("ok");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    void load();

    const id = window.setInterval(load, POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const token: TokenChip = useMemo(
    () => ({
      key: "eth",
      label: "ETH",
      value: data?.ethUsd ?? null,
      source: data?.sources.eth ?? "pending",
      className: chipTone(
        status,
        data?.ethUsd ?? null,
        "border-slate-300/45 bg-slate-200/10 text-slate-100 shadow-[0_0_8px_rgba(226,232,240,0.1)]",
      ),
    }),
    [data, status],
  );

  const title = data
    ? `Updated ${data.updatedAt} · ${token.label}:${token.source}`
    : status === "error"
      ? "Price feed offline"
      : "Loading ETH market feed";

  return (
  <div
    className="relative flex min-w-0 flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-wider sm:gap-2.5 sm:text-[10px]"
    title={title}
    aria-live="polite"
  >
    <span className="inline-flex items-center gap-1 text-neon-cyan">
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-cyan shadow-[0_0_7px_#00f0ff]"
        aria-hidden="true"
      />
      <span>LIVE</span>
    </span>

    <Chip token={token} status={status} />
  </div>
);
}

function Chip({
  token,
  status,
}: {
  token: TokenChip;
  status: "loading" | "ok" | "error";
}) {
  const label =
    status === "loading" && token.value == null
      ? "…"
      : formatUsd(token.value);

  return (
    <span
      className={`rounded border px-1.5 py-0.5 sm:px-2 ${token.className}`}
      title={token.source}
    >
      <span className="hidden text-muted sm:inline">
        {token.label} {"//"}{" "}
      </span>
      <span className="sm:hidden">{token.label} </span>
      {label}
    </span>
  );
}