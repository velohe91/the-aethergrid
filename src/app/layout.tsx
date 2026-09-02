import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import { ImmersiveShell } from "@/components/layout/ImmersiveShell";
import { Web3Providers } from "@/components/web3/Web3Providers";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const shareTech = Share_Tech_Mono({
  variable: "--font-share-tech",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "External grid node. Spirit cores and protocol layers — synchronized under Web 3.0.",
  keywords: ["Aethergrid", "Spirits", "Web3", "protocol", "cyberpunk"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${shareTech.variable} font-mono antialiased`}
      >
        <Web3Providers>
          <ImmersiveShell>{children}</ImmersiveShell>
        </Web3Providers>
      </body>
    </html>
  );
}
