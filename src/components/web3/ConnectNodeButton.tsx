"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NodeAccountModal } from "@/components/web3/NodeAccountModal";
import { NetworkSwitchModal } from "@/components/web3/NetworkSwitchModal";
import { getChainBadgeLabel, PRIMARY_CHAIN } from "@/lib/web3/config";
import { truncateAddress } from "@/lib/web3/account";

/**
 * CONNECT NODE — RainbowKit wallet list for connect; custom Velohe-style
 * modals for account + network (Ethereum + Base only).
 */
export function ConnectNodeButton() {
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [networkModalOpen, setNetworkModalOpen] = useState(false);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
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

        return (
          <>
            {!connected ? (
              <button
                type="button"
                onClick={openConnectModal}
                className="rounded border border-neon-cyan/50 bg-neon-cyan/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neon-cyan transition-colors hover:border-neon-cyan hover:bg-neon-cyan/20"
              >
                Connect Node
              </button>
            ) : chain.unsupported ? (
              <button
                type="button"
                onClick={() => setNetworkModalOpen(true)}
                className="rounded border border-amber-400/50 bg-amber-500/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-amber-200 transition-colors hover:bg-amber-500/20"
                title={`Switch to ${PRIMARY_CHAIN.name}`}
              >
                Switch Network
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setNetworkModalOpen(true)}
                  className="hidden rounded border border-neon-blue/30 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-neon-blue sm:inline-flex"
                  title="Switch network"
                >
                  {getChainBadgeLabel(chain.id, chain.name)}
                </button>
                <button
                  type="button"
                  onClick={() => setAccountModalOpen(true)}
                  className="rounded border border-neon-cyan/40 bg-neon-cyan/5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neon-cyan transition-colors hover:border-neon-cyan hover:bg-neon-cyan/10"
                  title={account.address}
                >
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  {truncateAddress(account.address)}
                </button>
              </div>
            )}

            <NetworkSwitchModal
              open={networkModalOpen}
              onClose={() => setNetworkModalOpen(false)}
            />
            <NodeAccountModal
              open={accountModalOpen}
              onClose={() => setAccountModalOpen(false)}
            />
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
