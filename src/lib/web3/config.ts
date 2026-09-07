/**
 * Web3 config for THE AETHERGRID Phase 1.
 * Chains: Arc Testnet, Base, Ethereum, Polygon, BSC. Preferred: Arc Testnet.
 */

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { defineChain } from "viem";
import { base, bsc, mainnet, polygon } from "wagmi/chains";
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

export const SUPPORTED_CHAINS = [
  arcTestnet,
  base,
  mainnet,
  polygon,
  bsc,
] as const;

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
    chains: [arcTestnet, base, mainnet, polygon, bsc],
    transports: {
      [arcTestnet.id]: http("https://rpc.testnet.arc.network"),
      [base.id]: http(),
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [bsc.id]: http(),
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
}

export type WagmiConfig = ReturnType<typeof getWagmiConfig>;
