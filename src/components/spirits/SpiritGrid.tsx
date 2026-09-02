"use client";

import { useCallback, useState } from "react";
import type { SpiritItem } from "@/lib/types";
import { SpiritCard } from "@/components/spirits/SpiritCard";
import { SpiritModal } from "@/components/spirits/SpiritModal";

export function SpiritGrid({ items }: { items: SpiritItem[] }) {
  const [selected, setSelected] = useState<SpiritItem | null>(null);

  const open = useCallback((spirit: SpiritItem) => {
    setSelected(spirit);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((spirit, i) => (
          <SpiritCard key={spirit.id} spirit={spirit} index={i} onOpen={open} />
        ))}
      </div>
      <SpiritModal spirit={selected} onClose={close} />
    </>
  );
}
