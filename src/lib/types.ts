/** Shared domain types for THE AETHERGRID grid node. */

export type SpiritRarity = "common" | "rare" | "epic" | "legendary" | "mythic";
export type SpiritStatus = "Archived" | "Restricted" | "Unresolved";

export interface SpiritItem {
  id: string;
  code: string;
  title: string;
  image: string;
  video?: string;
  description: string;
  lore: string;
  series: "Aethergrid Spirits";
  rarity: SpiritRarity;
  marketplace?: string;
  status: SpiritStatus;
  year: number;
  tags: string[];
  core: "cyan" | "purple" | "gold" | "void" | "dual";
}

export type MarketCoinQuote = {
  id: string;
  symbol: string;
  name: string;
  image: string | null;
  usd: number | null;
  marketCapRank: number;
};

export type MarketPricesResponse = {
  updatedAt: string;
  coins: MarketCoinQuote[];
};