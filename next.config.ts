import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Optimizes for AWS Amplify
  images: {
    domains: ['shannonmuruli.com'],
    // Add other image domains as needed (e.g., Cloudinary, Instagram)
  },
};

export default nextConfig;
