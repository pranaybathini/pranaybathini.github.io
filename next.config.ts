import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
