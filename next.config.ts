import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  distDir: "out", // Output folder
  basePath: "", // Adjust this to match your repo name
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
