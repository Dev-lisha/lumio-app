import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import "@lumio/ui/tokens/design-tokens.css";
import "./globals.css";
import { siteUrl } from "./site-url";

const display = localFont({
  src: "../../fonts/fraunces-latin-500.woff2",
  weight: "500",
  variable: "--font-lumio-display",
});
const ui = localFont({
  src: "../../fonts/ibm-plex-sans-latin-variable.woff2",
  weight: "400 600",
  variable: "--font-lumio-ui",
});
const mono = localFont({
  src: "../../fonts/ibm-plex-mono-latin-500.woff2",
  weight: "500",
  variable: "--font-lumio-mono",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Lumio — Admin",
  description: "Operate the cooperative: members, cycles, proposals, and payouts.",
  icons: { icon: "/brand/favicon.svg" },
  openGraph: {
    title: "Lumio — Admin",
    description: "Operate the cooperative: members, cycles, proposals, and payouts.",
    url: "/",
    siteName: "Lumio Admin",
    images: [
      {
        url: "/brand/lumio-lockup-horizontal-on-light.svg",
        width: 1200,
        height: 630,
        alt: "Lumio Admin - Cooperative Finance Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumio — Admin",
    description: "Operate the cooperative: members, cycles, proposals, and payouts.",
    images: ["/brand/lumio-lockup-horizontal-on-light.svg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${ui.variable} ${mono.variable}`}>
      <body>
        <header className="border-b border-ink-800">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            {/* Real brand asset from the foundation kit, copied verbatim — never redrawn. */}
            <Image
              src="/brand/lumio-lockup-horizontal-on-dark.svg"
              alt="Lumio"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
            <span className="font-mono text-caption uppercase tracking-wide text-ink-400">
              Admin
            </span>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-16">{children}</main>
      </body>
    </html>
  );
}
