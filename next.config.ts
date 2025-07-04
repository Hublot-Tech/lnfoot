import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ln-foot.com',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com'
      }
    ],
  },
};

export default nextConfig;
