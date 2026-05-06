import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shannonmuruli.com',
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
