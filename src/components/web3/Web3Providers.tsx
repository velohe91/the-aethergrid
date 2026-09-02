"use client";

import { useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { getWagmiConfig, PRIMARY_CHAIN } from "@/lib/web3/config";

/**
 * Client-only Web3 shell: wagmi + RainbowKit + React Query.
 * Config is created once per browser session (SSR-safe).
 */
export function Web3Providers({ children }: { children: ReactNode }) {
  const [config] = useState(() => getWagmiConfig());
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={PRIMARY_CHAIN}
          theme={darkTheme({
            accentColor: "#00f0ff",
            accentColorForeground: "#03050a",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
          modalSize="compact"
          coolMode={false}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
