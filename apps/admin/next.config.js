/** @type {import('next').NextConfig} */
const nextConfig = {
  // These packages are linked from the sibling `lumio-sdk` checkout; let Next
  // process them so the symlinked, cross-repo imports resolve reliably.
  transpilePackages: ["@lumio/app-shell", "@lumio/ui", "@lumio/sdk", "@lumio/shared"],
  // Linting is a separate turbo/eslint task at the repo root, not part of build.
  eslint: { ignoreDuringBuilds: true },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = async () => {
  if (globalThis.process.env.ANALYZE !== "true") return nextConfig;

  const { default: withBundleAnalyzer } = await import("@next/bundle-analyzer");
  return withBundleAnalyzer({ enabled: true })(nextConfig);
};
