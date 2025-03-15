import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  distDir: "out", // Output folder
  basePath: "/pranaybathini.github.io", // Adjust this to match your repo name
  assetPrefix: "/pranaybathini.github.io/",
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
