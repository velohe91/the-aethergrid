import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { arbitrum, avalanche, base, bsc, mainnet, optimism, polygon } from "wagmi/chains";
import { defineChain } from "viem";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { SITE_NAME } from "@/lib/constants";

export const PRIMARY_CHAIN = mainnet;

export const robinhood = defineChain({
  id: 4663, name: "Robinhood Chain",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: { default: { http: ["https://rpc.mainnet.chain.robinhood.com"] } },
  blockExplorers: { default: { name: "Robinhood Blockscout", url: "https://robinhoodchain.blockscout.com" } },
});
export const arc = defineChain({
  id: 5042, name: "Arc",
  nativeCurrency: { decimals: 18, name: "USD Coin", symbol: "USDC" },
  rpcUrls: { default: { http: ["https://rpc.mainnet.arc.io"] } },
  blockExplorers: { default: { name: "Arc Explorer", url: "https://explorer.arc.io" } },
});

export const SUPPORTED_CHAINS = [mainnet, base, polygon, bsc, arbitrum, optimism, avalanche, robinhood, arc] as const;
export const CHAIN_BADGE_LABELS: Record<number, string> = {
  [mainnet.id]: "ETHEREUM", [base.id]: "BASE", [polygon.id]: "POLYGON", [bsc.id]: "BSC",
  [arbitrum.id]: "ARBITRUM", [optimism.id]: "OPTIMISM", [avalanche.id]: "AVALANCHE",
  [robinhood.id]: "ROBINHOOD", [arc.id]: "ARC",
};
export function getChainBadgeLabel(chainId: number, fallbackName?: string): string {
  return CHAIN_BADGE_LABELS[chainId] ?? (fallbackName ? fallbackName.toUpperCase() : `CHAIN ${chainId}`);
}
export const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "MISSING_WC_PROJECT_ID";
export const APP_NAME = SITE_NAME;

export function getWagmiConfig() {
  const connectors = connectorsForWallets([{ groupName: "Recommended", wallets: [metaMaskWallet, rainbowWallet, walletConnectWallet] }], { appName: APP_NAME, projectId: WC_PROJECT_ID });
  return createConfig({
    connectors, chains: SUPPORTED_CHAINS,
    transports: { [mainnet.id]: http(), [base.id]: http(), [polygon.id]: http(), [bsc.id]: http(), [arbitrum.id]: http(), [optimism.id]: http(), [avalanche.id]: http(), [robinhood.id]: http(), [arc.id]: http() },
    ssr: true, storage: createStorage({ storage: cookieStorage }),
  });
}
export type WagmiConfig = ReturnType<typeof getWagmiConfig>;