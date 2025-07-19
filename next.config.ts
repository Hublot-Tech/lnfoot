import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ln-foot.com',
      },
      
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      }
    ],
  },
}

export default nextConfig
