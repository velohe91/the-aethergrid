/**
 * THE AETHERGRID SPIRITS — grid-node catalog (VEL-AGS01…05).
 *
 * Newest first in the gallery: AGS05 → AGS01.
 *
 * Expected media (drop files here when available):
 *   stills  /public/spirits/images/AGS01.png … AGS05.png
 *   motion  /public/spirits/videos/AGS01.mp4 … AGS05.mp4
 *
 * Missing stills render a core placeholder frame.
 * Missing videos hide the motion toggle in the modal.
 *
 * OpenSea URLs match the VΣLOHE archive catalog (same collection).
 */

import type { SpiritItem } from "@/lib/types";

const catalog: SpiritItem[] = [
  {
    id: "VEL-AGS01",
    code: "AGS01",
    title: "Cyan Core — The First Seeker",
    image: "/spirits/images/AGS01.png",
    video: "/spirits/videos/AGS01.mp4",
    description: "Baseline persistence",
    lore: `Cyan-Class Seeker, powered by a radiant detection core. Its polished silver frame and glowing halo mark it as one of the earliest awakened Spirits, engineered to explore the hidden layers of the Grid and uncover signals long buried. Calm, precise, and endlessly curious, this Spirit stands at the dawn of the Aethergrid’s evolution.

✨ Lore Fragment
“Its light was the first to shine—guiding all others that would follow.”`,
    series: "Aethergrid Spirits",
    rarity: "common",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/2",
    status: "Archived",
    year: 2052,
    tags: ["cyan", "seeker", "core"],
    core: "cyan",
  },
  {
    id: "VEL-AGS02",
    code: "AGS02",
    title: "Purple Core — The Ether Prism",
    image: "/spirits/images/AGS02.png",
    video: "/spirits/videos/AGS02.mp4",
    description: "Adaptive persistence",
    lore: `Purple-Class Manipulator, powered by a radiant Prism Core capable of bending ether-energy into precise geometric forms. Unlike Cyan Seekers, whose cores emit clarity and detection, Purple Spirits channel unstable, mystical currents—This Purple Core embodies that energy with flawless symmetry. Elegant, enigmatic, and attuned to deeper layers of the Grid, this Spirit manipulates ether with uncommon finesse.

✨ Lore Fragment
“Its core refracts the unseen—splitting reality into forms only it can shape.”`,
    series: "Aethergrid Spirits",
    rarity: "rare",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/13",
    status: "Restricted",
    year: 2052,
    tags: ["purple", "prism", "core"],
    core: "purple",
  },
  {
    id: "VEL-AGS03",
    code: "AGS03",
    title: "Gold Core — The Golden Anchor",
    image: "/spirits/images/AGS03.png",
    video: "/spirits/videos/AGS03.mp4",
    description: "High-stability persistence",
    lore: `Gold-Class Anchor, forged to embody stability, prosperity, and structural authority within the Aethergrid. Radiating warm golden energy, this Spirit acts as a convergence point where power is stored, refined, and redistributed with absolute precision. Its hexagonal core and orb represent order, value, and perfect balance.
Where others move or observe, the Gold Core anchors.

✨ Lore Fragment
“Gold does not rush. It holds.”`,
    series: "Aethergrid Spirits",
    rarity: "epic",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/25",
    status: "Restricted",
    year: 2052,
    tags: ["gold", "anchor", "core"],
    core: "gold",
  },
  {
    id: "VEL-AGS04",
    code: "AGS04",
    title: "Void Core — The Abyss Walker",
    image: "/spirits/images/AGS04.png",
    video: "/spirits/videos/AGS04.mp4",
    description: "Anomalous persistence",
    lore: `Is the first known manifestation of the Void-Class, a forbidden lineage born where the Aethergrid fractures into the unknown. Instead of emitting harmony, its singularity core absorbs surrounding energy, creating localized anomalies that distort the Grid itself. With crimson void optics, a collapsing orb, and an unstable halo, Void Core is a rare entity feared even by the oldest Spirits.
It does not seek balance.
It consumes it.

✨ Lore Fragment
"Where the Grid ends... it begins."`,
    series: "Aethergrid Spirits",
    rarity: "legendary",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/26",
    status: "Unresolved",
    year: 2052,
    tags: ["void", "abyss", "core"],
    core: "void",
  },
  {
    id: "VEL-AGS05",
    code: "AGS05",
    title: "Dual-Core — The Twin Resonance",
    image: "/spirits/images/AGS05.png",
    video: "/spirits/videos/AGS05.mp4",
    description: "Convergent persistence",
    lore: `Is the first recorded Dual-Core Spirit, born from the perfect synchronization of Cyan and Purple energy matrices. Rather than competing, both cores coexist in complete harmony, creating a balanced consciousness capable of perceiving logic and intuition simultaneously. Every movement, every pulse, and every decision emerges from two minds acting as one.
A rare convergence where balance meets evolution.

✨ Lore Fragment
"Two frequencies. One consciousness."`,
    series: "Aethergrid Spirits",
    rarity: "mythic",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/27",
    status: "Unresolved",
    year: 2052,
    tags: ["dual", "resonance", "core"],
    core: "dual",
  },
];

function spiritNumber(id: string): number {
  const m = id.match(/AGS(\d+)/i);
  return m ? parseInt(m[1], 10) : 0;
}

/** Public catalog — newest first (AGS05 at top). */
export const spirits: SpiritItem[] = [...catalog].sort(
  (a, b) => spiritNumber(b.id) - spiritNumber(a.id),
);

export function getSpiritById(id: string): SpiritItem | undefined {
  return catalog.find((s) => s.id === id);
}
