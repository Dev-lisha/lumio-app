import type { ReactNode } from "react";
import Image from "next/image";
import localFont from "next/font/local";

const display = localFont({
  src: "../fonts/fraunces-latin-500.woff2",
  weight: "500",
  variable: "--font-lumio-display",
});
const ui = localFont({
  src: "../fonts/ibm-plex-sans-latin-variable.woff2",
  weight: "400 600",
  variable: "--font-lumio-ui",
});
const mono = localFont({
  src: "../fonts/ibm-plex-mono-latin-500.woff2",
  weight: "500",
  variable: "--font-lumio-mono",
});

type AppShellProps = {
  appName: string;
  navLabel: string;
  version: string;
  children: ReactNode;
};

export function AppShell({ appName, navLabel, version, children }: AppShellProps) {
  return (
    <html lang="en" className={`${display.variable} ${ui.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:not-sr-only focus:rounded-s focus:bg-lumen focus:px-4 focus:py-3 focus:font-ui focus:text-body-s focus:text-ink-950 focus:ring-2 focus:ring-paper"
        >
          Skip to main content
        </a>
        <header className="border-b border-ink-800">
          <nav
            aria-label={`${appName} navigation`}
            className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
          >
            <Image
              src="/brand/lumio-lockup-horizontal-on-dark.svg"
              alt="Lumio"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
            <span className="font-mono text-caption uppercase tracking-wide text-ink-400">
              {navLabel}
            </span>
          </nav>
        </header>
        <main id="main" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
          {children}
        </main>
        <footer className="border-t border-ink-800">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-6 font-ui text-body-s text-ink-400 sm:flex-row sm:items-center sm:justify-between">
            <span>Version {version}</span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                className="transition-colors hover:text-paper"
                href="https://github.com/lumio-network"
              >
                Lumio on GitHub
              </a>
              <a
                className="transition-colors hover:text-paper"
                href="https://www.apache.org/licenses/LICENSE-2.0"
              >
                Apache-2.0
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
