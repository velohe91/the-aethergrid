"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { getChainBadgeLabel } from "@/lib/web3/config";
import { formatNativeBalance, getEvmExplorerUrl, truncateAddress } from "@/lib/web3/evm";

type Props = { open: boolean; onClose: () => void; onSwitchNetwork: () => void };

export function NodeAccountModal({ open, onClose, onSwitchNetwork }: Props) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { address, chain, isConnected } = useAccount();
  const { data: balance } = useBalance({ address, query: { enabled: Boolean(address) } });
  const { disconnect } = useDisconnect();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!mounted || !open) return null;

  const copy = async () => {
    if (!address) return;
    try { await navigator.clipboard.writeText(address); setCopied(true); } catch { /* clipboard unavailable */ }
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4">
      <button type="button" className="absolute inset-0 bg-void/85 backdrop-blur-sm" aria-label="Close" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="node-account-title" className="panel box-glow relative z-10 my-auto w-full max-w-md rounded-lg border border-neon-cyan/30 p-5 sm:p-6" onClick={(event) => event.stopPropagation()}>
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan/70">Node // EVM Account</p>
        <h2 id="node-account-title" className="mt-2 font-sans text-lg font-semibold tracking-wide text-neon-cyan">Connected Node</h2>
        {isConnected && address ? <article className="mt-5 rounded border border-neon-cyan/25 bg-black/40 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan">{getChainBadgeLabel(chain?.id ?? 1, chain?.name)}</p>
          <p className="mt-2 font-mono text-xs text-foreground">{truncateAddress(address, 6, 4)}</p>
          <p className="mt-1 font-mono text-[11px] text-neon-cyan/80">{balance ? formatNativeBalance(Number(balance.formatted), balance.symbol) : `--- ${chain?.nativeCurrency.symbol ?? "ETH"}`}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => void copy()} className="rounded border border-neon-cyan/30 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-neon-cyan hover:bg-neon-cyan/10">{copied ? "Copied" : "Copy"}</button>
            <a href={getEvmExplorerUrl(chain?.id ?? 1, address)} target="_blank" rel="noopener noreferrer" className="rounded border border-neon-blue/30 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-neon-blue hover:bg-neon-blue/10">Explorer</a>
            <button type="button" onClick={() => disconnect()} className="rounded border border-rose-400/40 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-rose-300 hover:bg-rose-500/10">Disconnect</button>
          </div>
          <button type="button" onClick={() => { onClose(); onSwitchNetwork(); }} className="mt-3 w-full rounded border border-neon-blue/30 px-2 py-1.5 font-mono text-[9px] uppercase tracking-widest text-neon-blue hover:bg-neon-blue/10">Switch Network</button>
        </article> : <p className="mt-5 font-mono text-[11px] text-muted">No EVM wallet connected.</p>}
        <button type="button" onClick={onClose} className="mt-5 w-full rounded border border-neon-cyan/20 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-neon-cyan/40 hover:text-neon-cyan">Close</button>
      </div>
    </div>,
    document.body,
  );
}