import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  distDir: "out", // Output folder
  basePath: "", // No subpath since this is a user GitHub page
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
