import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import appPackage from "../package.json";
import tokens from "@lumio/ui/tokens/design-tokens.json";
import { AppShell } from "@lumio/app-shell";
import "@lumio/ui/tokens/design-tokens.css";
import "./globals.css";
import { siteUrl } from "./site-url";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Lumio — Member Dashboard",
  description: "Your cooperative's savings, contributions, and payouts at a glance.",
  icons: { icon: "/brand/favicon.svg" },
  openGraph: {
    title: "Lumio — Member Dashboard",
    description: "Your cooperative's savings, contributions, and payouts at a glance.",
    url: "/",
    siteName: "Lumio",
    images: [
      {
        url: "/brand/lumio-lockup-horizontal-on-light.svg",
        width: 1200,
        height: 630,
        alt: "Lumio - Cooperative Finance Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumio — Member Dashboard",
    description: "Your cooperative's savings, contributions, and payouts at a glance.",
    images: ["/brand/lumio-lockup-horizontal-on-light.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: tokens.color.neutral_dark["ink-950"],
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell appName="Lumio Member" navLabel="Member" version={appPackage.version}>
      {children}
    </AppShell>
  );
}
