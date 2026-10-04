import type { SpiritItem, SpiritRarity } from "@/lib/types";
import { spirits as catalog } from "@/data/spirits";

type OpenSeaTrait = {
  trait_type?: string;
  value?: string | number | null;
};

type OpenSeaNFT = {
  identifier?: string;
  name?: string | null;
  description?: string | null;
  image_url?: string | null;
  animation_url?: string | null;
  original_animation_url?: string | null;
  metadata_url?: string | null;
  opensea_url?: string | null;
  traits?: OpenSeaTrait[];
};

type OpenSeaResponse = {
  nfts?: OpenSeaNFT[];
};

const CONTRACT = "0x407ccb1e09eb93525c2a5d12aeb1a46da135d737";
const OPEN_SEA_API_URL = `https://api.opensea.io/api/v2/chain/ethereum/contract/${CONTRACT}`;

function rarityFromTraits(
  traits: OpenSeaTrait[] | undefined,
  fallback: SpiritRarity,
): SpiritRarity {
  const rarity = traits?.find((trait) =>
    trait.trait_type?.toLowerCase().includes("rarity"),
  )?.value;

  if (typeof rarity !== "string") return fallback;

  const normalized = rarity.toLowerCase();
  if (normalized === "common") return "common";
  if (normalized === "rare") return "rare";
  if (normalized === "epic") return "epic";
  if (normalized === "legendary") return "legendary";
  if (normalized === "mythic") return "mythic";

  return fallback;
}

function tokenNumber(identifier: string | undefined): number | null {
  if (!identifier) return null;
  const value = Number(identifier);
  return Number.isInteger(value) ? value : null;
}

function legacyForToken(tokenId: number | null): SpiritItem | undefined {
  if (tokenId === null) return undefined;
  return catalog.find((spirit) => {
    const match = spirit.marketplace?.match(/\/(\d+)$/);
    return match ? Number(match[1]) === tokenId : false;
  });
}

function isVideoMedia(url?: string | null): boolean {
  return Boolean(url && /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(url));
}

function extractAethergridStarEmojis(description?: string | null): string {
  if (!description) return "";

  return Array.from(description.matchAll(/⭐/gu))
    .map((match) => match[0])
    .join("");
}

function normalizeSpirit(
  nft: OpenSeaNFT,
  displayNumber: number,
): SpiritItem | null {
  const tokenId = tokenNumber(nft.identifier);
  const legacy = legacyForToken(tokenId);
  const imageUrl = nft.image_url || "";
  const videoUrl = isVideoMedia(imageUrl)
    ? imageUrl
    : nft.original_animation_url || nft.animation_url || undefined;

  if (!imageUrl && !videoUrl) return null;

  const fallbackId = `VEL-AGS${String(displayNumber).padStart(3, "0")}`;
  const fallbackCode = `AGS${String(displayNumber).padStart(2, "0")}`;
  const description = extractAethergridStarEmojis(nft.description);
  const title =
    nft.name?.trim() ||
    `The Aethergrid Spirits #${displayNumber}`;
  const marketplace =
    nft.opensea_url ||
    `https://opensea.io/item/ethereum/${CONTRACT}/${nft.identifier}`;

  return {
    ...(legacy ?? {
      id: fallbackId,
      code: fallbackCode,
      title,
      image: "",
      description,
      lore:
        nft.description?.trim() ||
        "Live Aethergrid Spirit recorded on Ethereum.",
      series: "Aethergrid Spirits",
      rarity: "common",
      marketplace,
      status: "Archived",
      year: 2052,
      tags: ["aethergrid", "spirit", "ethereum"],
      core: "cyan",
    }),
    id: legacy?.id ?? fallbackId,
    code: legacy?.code ?? fallbackCode,
    title,
    image: isVideoMedia(imageUrl) ? "" : imageUrl,
    video: videoUrl,
    description,
    lore:
      nft.description?.trim() ||
      legacy?.lore ||
      "Live Aethergrid Spirit recorded on Ethereum.",
    rarity: rarityFromTraits(nft.traits, legacy?.rarity ?? "common"),
    marketplace,
    status: legacy?.status ?? "Archived",
    year: legacy?.year ?? 2052,
    tags: legacy?.tags ?? ["aethergrid", "spirit", "ethereum"],
    core: legacy?.core ?? "cyan",
  };
}

let spiritsPromise: Promise<SpiritItem[]> | null = null;

async function fetchOpenSeaSpirits(): Promise<SpiritItem[]> {
  const apiKey = process.env.OPENSEA_API_KEY;
  if (!apiKey) {
    console.error("[Aethergrid Spirits] OPENSEA_API_KEY is not configured");
    return [];
  }

  const response = await fetch(`${OPEN_SEA_API_URL}/nfts?limit=200`, {
    headers: { "X-API-KEY": apiKey },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `[Aethergrid Spirits] OpenSea API request failed: ${response.status}`,
    );
    return [];
  }

  const data = (await response.json()) as OpenSeaResponse;
  const orderedNfts = [...(data.nfts ?? [])].sort((a, b) => {
    const aName = Number(a.name?.match(/(\d+)\s*$/)?.[1] ?? 0);
    const bName = Number(b.name?.match(/(\d+)\s*$/)?.[1] ?? 0);
    return aName - bName;
  });

  return orderedNfts
    .map((nft, index) => normalizeSpirit(nft, index + 1))
    .filter((spirit): spirit is SpiritItem => Boolean(spirit))
    .sort((a, b) => {
      const aId = Number(a.id.match(/(\d+)$/)?.[1] ?? 0);
      const bId = Number(b.id.match(/(\d+)$/)?.[1] ?? 0);
      return aId - bId;
    });
}

export async function getLiveAethergridSpirits(): Promise<SpiritItem[]> {
  if (!spiritsPromise) {
    spiritsPromise = fetchOpenSeaSpirits().catch((error) => {
      spiritsPromise = null;
      console.error("[Aethergrid Spirits] Failed to load OpenSea data", error);
      return [];
    });
  }

  return spiritsPromise;
}
