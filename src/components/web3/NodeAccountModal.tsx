"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import {
  formatNativeBalance,
  getEvmExplorerUrl,
  truncateAddress,
} from "@/lib/web3/account";
import { getChainBadgeLabel } from "@/lib/web3/config";

type Props = {
  open: boolean;
  onClose: () => void;
};

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // ignore
  }
}

/** Custom Aethergrid account panel. */
export function NodeAccountModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const { address, chain, isConnected } = useAccount();
  const { data: evmBalance } = useBalance({
    address,
    query: { enabled: Boolean(address) },
  });
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  if (!mounted || !open) return null;

  const markCopied = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4">
      <button
        type="button"
        className="absolute inset-0 bg-void/85 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="node-account-title"
        className="panel box-glow relative z-10 my-auto w-full max-w-lg max-h-[min(88dvh,640px)] overflow-y-auto rounded-lg border border-neon-cyan/30 p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan/70">
          Node // Linked Identity
        </p>
        <h2
          id="node-account-title"
          className="mt-2 font-sans text-lg font-semibold tracking-wide text-neon-cyan"
        >
          Account
        </h2>

        <div className="mt-5 space-y-3">
          {isConnected && address ? (
            <article className="rounded border border-neon-cyan/25 bg-black/40 p-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
                  EVM
                </p>
                <p className="mt-1 font-mono text-[10px] text-muted">
                  {chain ? getChainBadgeLabel(chain.id, chain.name) : "UNKNOWN"}
                </p>
                <p className="mt-1 font-mono text-xs text-foreground">
                  {truncateAddress(address, 6, 4)}
                </p>
                <p className="mt-1 font-mono text-[11px] text-neon-cyan/80">
                  {evmBalance
                    ? formatNativeBalance(
                        Number(evmBalance.formatted),
                        evmBalance.symbol,
                      )
                    : `--- ${chain?.nativeCurrency.symbol ?? "ETH"}`}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded border border-neon-cyan/30 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-neon-cyan hover:bg-neon-cyan/10"
                  onClick={async () => {
                    await copyText(address);
                    markCopied();
                  }}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
                <a
                  href={getEvmExplorerUrl(chain?.id ?? 1, address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-neon-blue/30 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-neon-blue hover:bg-neon-blue/10"
                >
                  Explorer
                </a>
                <button
                  type="button"
                  className="rounded border border-rose-400/40 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-rose-300 hover:bg-rose-500/10"
                  onClick={() => {
                    disconnect();
                    onClose();
                  }}
                >
                  Disconnect
                </button>
              </div>
            </article>
          ) : (
            <p className="font-mono text-[11px] text-muted">No node linked.</p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded border border-neon-cyan/20 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-neon-cyan/40 hover:text-neon-cyan"
        >
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
