import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'dist',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https", 
        hostname: "**.supabase.co",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
