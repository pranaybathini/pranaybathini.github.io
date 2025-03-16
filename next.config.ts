import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Enables static export
  // distDir: "out", // Output folder
  basePath: "", // Adjust this to match your repo name
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
