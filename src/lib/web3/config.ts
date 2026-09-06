/**
 * Web3 config for THE AETHERGRID Phase 1.
 * Chains: Ethereum, Base. Preferred: Base.
 */

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { SITE_NAME } from "@/lib/constants";

export const PRIMARY_CHAIN = base;

export const SUPPORTED_CHAINS = [base, mainnet] as const;

/** Short cyberpunk labels for the header network badge */
export const CHAIN_BADGE_LABELS: Record<number, string> = {
  [base.id]: "BASE",
  [mainnet.id]: "ETHEREUM",
};

export function getChainBadgeLabel(
  chainId: number,
  fallbackName?: string,
): string {
  return (
    CHAIN_BADGE_LABELS[chainId] ??
    (fallbackName ? fallbackName.toUpperCase() : `CHAIN ${chainId}`)
  );
}

export const WC_PROJECT_ID =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "MISSING_WC_PROJECT_ID";

export const APP_NAME = SITE_NAME;

/** Create wagmi config in the client provider (not at import time). */
export function getWagmiConfig() {
  // coinbaseWallet omitted — CDP SDK pulls optional @x402 deps that break Next builds.
  const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended",
        wallets: [metaMaskWallet, rainbowWallet, walletConnectWallet],
      },
    ],
    {
      appName: APP_NAME,
      projectId: WC_PROJECT_ID,
    },
  );

  return createConfig({
    connectors,
    chains: [base, mainnet],
    transports: {
      [base.id]: http(),
      [mainnet.id]: http(),
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
}

export type WagmiConfig = ReturnType<typeof getWagmiConfig>;