import { NextResponse } from "next/server";
import type { MarketPricesResponse } from "@/lib/types";

export type { MarketPricesResponse };

/** In-memory cache (30–60s) to reduce upstream rate limits */
let cache: { at: number; body: MarketPricesResponse } | null = null;
const CACHE_MS = 45_000;

type CoinGeckoPrices = Record<string, { usd?: number }>;

type PriceResult = {
  value: number | null;
  source: string;
};

function getPrice(
  data: CoinGeckoPrices | null,
  id: string,
  source: string,
): PriceResult {
  const usd = data?.[id]?.usd;
  return {
    value: typeof usd === "number" ? usd : null,
    source: typeof usd === "number" ? source : "pending",
  };
}

async function fetchMarketPrices(): Promise<CoinGeckoPrices | null> {
  const ids = [
    "bitcoin",
    "ethereum",
    "binancecoin",
    "solana",
    "polygon-ecosystem-token",
    "tezos",
  ];

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids.join(","))}&vs_currencies=usd`,
      { next: { revalidate: 45 }, headers: { Accept: "application/json" } },
    );
    if (!res.ok) return null;
    return (await res.json()) as CoinGeckoPrices;
  } catch {
    return null;
  }
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_MS) {
    return NextResponse.json(cache.body, {
      headers: {
        "Cache-Control": "public, s-maxage=45, stale-while-revalidate=30",
      },
    });
  }

  const data = await fetchMarketPrices();

  const btc = getPrice(data, "bitcoin", "coingecko:bitcoin");
  const eth = getPrice(data, "ethereum", "coingecko:ethereum");
  const bnb = getPrice(data, "binancecoin", "coingecko:binancecoin");
  const sol = getPrice(data, "solana", "coingecko:solana");
  const pol = getPrice(
    data,
    "polygon-ecosystem-token",
    "coingecko:polygon-ecosystem-token",
  );
  const xtz = getPrice(data, "tezos", "coingecko:tezos");

  const body: MarketPricesResponse = {
    btcUsd: btc.value,
    ethUsd: eth.value,
    bnbUsd: bnb.value,
    solUsd: sol.value,
    polUsd: pol.value,
    xtzUsd: xtz.value,
    txzUsd: xtz.value,
    updatedAt: new Date().toISOString(),
    sources: {
      btc: btc.source,
      eth: eth.source,
      bnb: bnb.source,
      sol: sol.source,
      pol: pol.source,
      xtz: xtz.source,
      txz: xtz.source,
    },
  };

  cache = { at: now, body };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=45, stale-while-revalidate=30",
    },
  });
}
