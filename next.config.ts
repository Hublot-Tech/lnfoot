import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lnfoot-img.hublots.co',
      },
    ],
  },
};

export default nextConfig;
