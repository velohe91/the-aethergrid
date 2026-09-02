import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpiritGrid } from "@/components/spirits/SpiritGrid";
import { spirits } from "@/data/spirits";

export const metadata: Metadata = {
  title: "Spirits",
  description:
    "The Aethergrid Spirits — robotic energy beings born where light, code, and consciousness merge. Five cores: Cyan, Purple, Gold, Void, Dual-Core.",
};

export default function SpiritsPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          eyebrow={'Grid // Spirit Cores'}
          title="The Aethergrid Spirits"
          subtitle={`The Aethergrid Spirits — robotic energy beings born where light, code, and consciousness merge. Five cores: Cyan, Purple, Gold, Void, Dual-Core.

Collect a Spirit. Unlock a fragment of the Aethergrid.`}
        />
        <SpiritGrid items={spirits} />
      </div>
    </PageTransition>
  );
}
