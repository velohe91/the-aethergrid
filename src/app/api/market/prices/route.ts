import { NextResponse } from "next/server";
import type { MarketCoinQuote, MarketPricesResponse } from "@/lib/types";

let cache: { at: number; body: MarketPricesResponse } | null = null;
const CACHE_MS = 45_000;
const CACHE_HEADERS = { "Cache-Control": "public, s-maxage=45, stale-while-revalidate=30" };

type CoinMarketCapListing = { id?: number; symbol?: string; name?: string; cmc_rank?: number | null; quote?: Array<{ id?: number; symbol?: string; price?: number | null }> };

function toCoin(row: CoinMarketCapListing, index: number): MarketCoinQuote {
  const usdQuote = row.quote?.find((quote) => quote.symbol === "USD") ?? row.quote?.[0];
  const usd = typeof usdQuote?.price === "number" && Number.isFinite(usdQuote.price) ? usdQuote.price : null;
  const rank = typeof row.cmc_rank === "number" && row.cmc_rank > 0 ? row.cmc_rank : index + 1;
  return { id: typeof row.id === "number" ? String(row.id) : `coin-${index}`, symbol: (row.symbol ?? "").toUpperCase(), name: row.name ?? "", image: typeof row.id === "number" ? `https://s2.coinmarketcap.com/static/img/coins/64x64/${row.id}.png` : null, usd, marketCapRank: rank };
}

async function fetchTopMarkets(): Promise<MarketCoinQuote[] | null> {
  try {
    const res = await fetch("https://pro-api.coinmarketcap.com/public-api/v3/cryptocurrency/listings/latest?start=1&limit=20&convert=USD", { next: { revalidate: 45 }, headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    const payload = (await res.json()) as { data?: CoinMarketCapListing[] };
    if (!Array.isArray(payload.data)) return null;
    return payload.data.slice(0, 20).map(toCoin).sort((a, b) => a.marketCapRank - b.marketCapRank);
  } catch { return null; }
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_MS) return NextResponse.json(cache.body, { headers: CACHE_HEADERS });
  const coins = await fetchTopMarkets();
  if (!coins) {
    if (cache) return NextResponse.json(cache.body, { headers: CACHE_HEADERS });
    return NextResponse.json({ updatedAt: new Date().toISOString(), coins: [] } satisfies MarketPricesResponse, { status: 502, headers: CACHE_HEADERS });
  }
  const body: MarketPricesResponse = { updatedAt: new Date().toISOString(), coins };
  cache = { at: now, body };
  return NextResponse.json(body, { headers: CACHE_HEADERS });
}