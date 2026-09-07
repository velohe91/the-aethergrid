"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NodeAccountModal } from "@/components/web3/NodeAccountModal";
import { NetworkSwitchModal } from "@/components/web3/NetworkSwitchModal";
import { getChainBadgeLabel, PRIMARY_CHAIN } from "@/lib/web3/config";
import { truncateAddress } from "@/lib/web3/account";

/**
 * CONNECT NODE — RainbowKit handles wallet selection; custom Aethergrid
 * modals handle the connected account and network controls.
 */
export function ConnectNodeButton() {
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [networkModalOpen, setNetworkModalOpen] = useState(false);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
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

        const unsupported = chain.unsupported;

        return (
          <>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setNetworkModalOpen(true)}
                className={`hidden rounded border px-2 py-1 font-mono text-[9px] uppercase tracking-widest sm:inline-flex ${
                  unsupported
                    ? "border-amber-400/50 bg-amber-500/10 text-amber-200"
                    : "border-neon-violet/40 text-neon-violet"
                }`}
                title={chain.name}
              >
                {unsupported
                  ? "SWITCH NETWORK"
                  : getChainBadgeLabel(chain.id, chain.name)}
              </button>
              <button
                type="button"
                onClick={() => setAccountModalOpen(true)}
                className="rounded border border-neon-cyan/40 bg-neon-cyan/5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neon-cyan transition-colors hover:border-neon-cyan hover:bg-neon-cyan/10"
                title={`${account.address} · Disconnect from account modal`}
              >
                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                {truncateAddress(account.address)}
              </button>
            </div>

            <NodeAccountModal
              open={accountModalOpen}
              onClose={() => setAccountModalOpen(false)}
            />
            <NetworkSwitchModal
              open={networkModalOpen}
              onClose={() => setNetworkModalOpen(false)}
            />
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
