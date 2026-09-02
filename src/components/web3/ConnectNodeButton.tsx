"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

function truncateAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-2)}`;
}

/**
 * CONNECT NODE — RainbowKit wrapper. Site remains usable when disconnected.
 */
export function ConnectNodeButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!ready) {
          return (
            <button
              type="button"
              disabled
              className="rounded border border-neon-cyan/20 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted opacity-50"
            >
              …
            </button>
          );
        }

        if (!connected) {
          return (
            <button
              type="button"
              onClick={openConnectModal}
              className="rounded border border-neon-cyan/50 bg-neon-cyan/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neon-cyan transition-colors hover:border-neon-cyan hover:bg-neon-cyan/20"
            >
              Connect Node
            </button>
          );
        }

        if (chain.unsupported) {
          return (
            <button
              type="button"
              onClick={openChainModal}
              className="rounded border border-amber-400/50 bg-amber-500/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-amber-200 transition-colors hover:bg-amber-500/20"
            >
              Switch Network
            </button>
          );
        }

        return (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openChainModal}
              className="hidden rounded border border-neon-violet/40 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-neon-violet sm:inline-flex"
              title={chain.name}
            >
              {chain.name}
            </button>
            <button
              type="button"
              onClick={openAccountModal}
              className="rounded border border-neon-cyan/40 bg-neon-cyan/5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neon-cyan transition-colors hover:border-neon-cyan hover:bg-neon-cyan/10"
              title={`${account.address} · Disconnect from account modal`}
            >
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              {truncateAddress(account.address)}
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
