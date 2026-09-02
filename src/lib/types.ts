/**
 * Shared domain types for THE AETHERGRID grid node.
 */

export type SpiritRarity =
  | "common"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic";

export type SpiritStatus = "Archived" | "Restricted" | "Unresolved";

export interface SpiritItem {
  /** Catalog ID, e.g. "VEL-AGS01" */
  id: string;
  /** Short code used in asset paths, e.g. "AGS01" */
  code: string;
  title: string;
  /**
   * Still frame. Expected path: /spirits/images/AGS01.png
   * Missing files fall back to a generated core frame.
   */
  image: string;
  /**
   * Optional motion loop. Expected path: /spirits/videos/AGS01.mp4
   * Omitted or missing files hide the motion toggle.
   */
  video?: string;
  description: string;
  lore: string;
  series: "Aethergrid Spirits";
  rarity: SpiritRarity;
  marketplace?: string;
  status: SpiritStatus;
  year: number;
  tags: string[];
  /** Accent used by placeholder frames */
  core: "cyan" | "purple" | "gold" | "void" | "dual";
}

export type MarketPricesResponse = {
  btcUsd: number | null;
  ethUsd: number | null;
  bnbUsd: number | null;
  solUsd: number | null;
  polUsd: number | null;
  /** Tezos (XTZ) USD. */
  xtzUsd: number | null;
  /** Alias of xtzUsd — kept so older ticker code does not break. */
  txzUsd: number | null;
  updatedAt: string;
  sources: {
    btc: string;
    eth: string;
    bnb: string;
    sol: string;
    pol: string;
    xtz: string;
    txz: string;
  };
};
