import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protocol",
  description:
    "The Aethergrid is an executable layer — Spirit cores will synchronize here.",
};

export default function ProtocolLayout({ children }: { children: ReactNode }) {
  return children;
}
