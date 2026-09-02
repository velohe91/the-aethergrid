/**
 * Web3 config for THE AETHERGRID Phase 1.
 * Chains: Ethereum, Base, Polygon, BSC. Preferred: Base.
 */

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, bsc, mainnet, polygon } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { SITE_NAME } from "@/lib/constants";

export const PRIMARY_CHAIN = base;

export const SUPPORTED_CHAINS = [base, mainnet, polygon, bsc] as const;

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
    chains: [base, mainnet, polygon, bsc],
    transports: {
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
