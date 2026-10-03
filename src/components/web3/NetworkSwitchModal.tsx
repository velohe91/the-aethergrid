"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAccount, useSwitchChain } from "wagmi";
import { SUPPORTED_CHAINS } from "@/lib/web3/config";

type Props = { open: boolean; onClose: () => void; onNetworkChanged?: () => void };

const rows = SUPPORTED_CHAINS.map((chain) => ({
  chainId: chain.id,
  label: chain.name === "Robinhood Chain" ? "ROBINHOOD" : chain.name.toUpperCase(),
}));

/** Custom EVM network switcher, portaled above the persistent navbar. */
export function NetworkSwitchModal({ open, onClose, onNetworkChanged }: Props) {
  const [mounted, setMounted] = useState(false);
  const { chain } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const choose = (chainId: number) => {
    if (chain?.id === chainId) { onClose(); return; }
    switchChain({ chainId }, { onSuccess: () => { onClose(); onNetworkChanged?.(); } });
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4">
      <button type="button" className="absolute inset-0 bg-void/85 backdrop-blur-sm" aria-label="Close" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="network-switch-title" className="panel box-glow relative z-10 my-auto w-full max-w-md max-h-[min(88dvh,640px)] overflow-y-auto rounded-lg border border-neon-cyan/30 p-5 sm:p-6" onClick={(event) => event.stopPropagation()}>
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan/70">Protocol // EVM</p>
        <h2 id="network-switch-title" className="mt-2 font-sans text-lg font-semibold tracking-wide text-neon-cyan">Switch Network</h2>
        <ul className="mt-5 space-y-2">
          {rows.map((row) => {
            const active = chain?.id === row.chainId;
            return <li key={row.chainId}><button type="button" disabled={isPending} onClick={() => choose(row.chainId)} className={`flex w-full items-center justify-between rounded border px-3 py-3 text-left transition-colors disabled:opacity-60 ${active ? "border-neon-cyan/60 bg-neon-cyan/15" : "border-neon-cyan/30 bg-neon-cyan/5 hover:border-neon-cyan/60 hover:bg-neon-cyan/10"}`}>
              <span className="flex items-center gap-2">{active && <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_#00f0ff]" aria-hidden />}<span className="font-mono text-[11px] uppercase tracking-widest text-neon-cyan">{row.label}</span></span>
              {active && <span className="font-mono text-[9px] uppercase tracking-widest text-neon-cyan/70">Active</span>}
            </button></li>;
          })}
        </ul>
        <button type="button" onClick={onClose} className="mt-5 w-full rounded border border-neon-cyan/20 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-neon-cyan/40 hover:text-neon-cyan">Close</button>
      </div>
    </div>,
    document.body,
  );
}