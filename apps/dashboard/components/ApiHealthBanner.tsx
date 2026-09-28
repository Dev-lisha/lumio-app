"use client";

import { useEffect, useState } from "react";
import { Badge } from "@lumio/ui";

type HealthState = "loading" | "up" | "down";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export function ApiHealthBanner() {
  const [health, setHealth] = useState<HealthState>("loading");

  useEffect(() => {
    let active = true;
    let requestInFlight = false;
    let requestController: AbortController | undefined;

    const checkHealth = async () => {
      if (requestInFlight) return;

      requestInFlight = true;
      const controller = new AbortController();
      requestController = controller;
      const timeoutId = window.setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(`${apiBaseUrl}/health`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (active) setHealth(response.ok ? "up" : "down");
      } catch {
        if (active) setHealth("down");
      } finally {
        window.clearTimeout(timeoutId);
        requestInFlight = false;
        if (requestController === controller) requestController = undefined;
      }
    };

    void checkHealth();
    const intervalId = window.setInterval(() => void checkHealth(), 30_000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
      requestController?.abort();
    };
  }, []);

  const variant = health === "up" ? "teal" : health === "down" ? "coral" : "neutral";
  const label = health === "up" ? "API up" : health === "down" ? "API down" : "API checking";

  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      <Badge variant={variant}>{label}</Badge>
    </div>
  );
}
