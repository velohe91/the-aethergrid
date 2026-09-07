"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAccount, useSwitchChain } from "wagmi";
import { getChainBadgeLabel, SUPPORTED_CHAINS } from "@/lib/web3/config";

type Props = {
  open: boolean;
  onClose: () => void;
};

const EVM_ROWS = SUPPORTED_CHAINS.map((c) => ({
  chainId: c.id,
  label: getChainBadgeLabel(c.id, c.name),
}));

/** Custom Aethergrid network switcher. */
export function NetworkSwitchModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const { chain } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const supportedEvmIds = new Set<number>(SUPPORTED_CHAINS.map((c) => c.id));
  const activeEvmId = chain && supportedEvmIds.has(chain.id) ? chain.id : null;

  const handleEvm = (chainId: number) => {
    if (chain?.id === chainId) {
      onClose();
      return;
    }
    switchChain(
      { chainId },
      {
        onSuccess: () => onClose(),
        onError: () => {
          // Keep modal open so the user can retry or close it.
        },
      },
    );
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
        aria-labelledby="network-switch-title"
        className="panel box-glow relative z-10 my-auto w-full max-w-md max-h-[min(88dvh,640px)] overflow-y-auto rounded-lg border border-neon-cyan/30 p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan/70">
          Protocol // Network
        </p>
        <h2
          id="network-switch-title"
          className="mt-2 font-sans text-lg font-semibold tracking-wide text-neon-cyan"
        >
          Switch Network
        </h2>

        <section className="mt-5">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted">
            Networks // EVM
          </p>
          <ul className="space-y-2">
            {EVM_ROWS.map((row) => {
              const active = activeEvmId === row.chainId;
              return (
                <li key={row.chainId}>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleEvm(row.chainId)}
                    className={`flex w-full items-center justify-between rounded border px-3 py-3 text-left transition-colors disabled:opacity-60 ${
                      active
                        ? "border-neon-cyan/60 bg-neon-cyan/15"
                        : "border-neon-cyan/30 bg-neon-cyan/5 hover:border-neon-cyan/60 hover:bg-neon-cyan/10"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {active && (
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_#00f0ff]"
                          aria-hidden
                        />
                      )}
                      <span className="font-mono text-[11px] uppercase tracking-widest text-neon-cyan">
                        {row.label}
                      </span>
                    </span>
                    {active && (
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neon-cyan/70">
                        Active
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

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
