import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lnfoot-img.hublots.co',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com'
      }
    ],
  },
};

export default nextConfig;
