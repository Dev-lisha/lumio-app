import type { MetadataRoute } from "next";
import tokens from "@lumio/ui/tokens/design-tokens.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lumio Admin",
    short_name: "Lumio Admin",
    start_url: "/",
    display: "standalone",
    background_color: tokens.color.neutral_dark["ink-950"],
    theme_color: tokens.color.brand.lumen.value,
    icons: [
      {
        src: "/brand/app-icon-dark-bg.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
