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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.shannonmuruli.com' }],
        destination: 'https://shannonmuruli.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
