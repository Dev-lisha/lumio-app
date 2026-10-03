"use client";

import { Button, Card, CardBody, CardTitle } from "@lumio/ui";
import "@lumio/ui/tokens/design-tokens.css";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <section className="flex min-h-screen items-center justify-center">
          <Card className="max-w-md">
            <CardTitle>Something went wrong</CardTitle>
            <CardBody className="space-y-4">
              <p className="font-ui text-body text-ink-400">
                We encountered an error while loading this page. This might be a temporary issue.
              </p>
              {error.message && (
                <details className="rounded-md border border-ink-800 p-3">
                  <summary className="cursor-pointer font-mono text-caption text-ink-500">
                    Error details
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-caption text-ink-400">
                    {error.message}
                  </pre>
                </details>
              )}
              <Button onClick={() => reset()}>Try again</Button>
            </CardBody>
          </Card>
        </section>
      </body>
    </html>
  );
}
