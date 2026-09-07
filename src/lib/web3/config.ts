/**
 * Web3 config for THE AETHERGRID Phase 1.
 * Chains: Arc Testnet, Base, Ethereum. Preferred: Arc Testnet.
 */

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { defineChain } from "viem";
import { base, mainnet } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { SITE_NAME } from "@/lib/constants";

/** Arc public testnet. Native gas is USDC, represented in 18-decimal EVM units. */
export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.arc.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Arcscan",
      url: "https://testnet.arcscan.app",
    },
  },
});

export const PRIMARY_CHAIN = arcTestnet;

export const SUPPORTED_CHAINS = [arcTestnet, base, mainnet] as const;

/** Short cyberpunk labels for the header network badge */
export const CHAIN_BADGE_LABELS: Record<number, string> = {
  [arcTestnet.id]: "ARC TESTNET",
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
    chains: [arcTestnet, base, mainnet],
    transports: {
      [arcTestnet.id]: http("https://rpc.testnet.arc.network"),
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
