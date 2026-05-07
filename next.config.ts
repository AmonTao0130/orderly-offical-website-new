import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily removing static export to enable API routes for the partnership form
  // For static hosting, consider using a serverless function or form service like Formspree
  output: "standalone",
  transpilePackages: ["@mui/icons-material", "@mui/material"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none';",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/docs",
        destination:
          "https://orderly.mintlify.dev/docs/getting-started/what-is-orderly-network",
      },
      {
        source: "/docs/:path*",
        destination: "https://orderly.mintlify.dev/docs/:path*",
      },
    ];
  },
};

export default nextConfig;
