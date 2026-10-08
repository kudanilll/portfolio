import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // AVIF first: smaller than WebP for the work photos, WebP as the fallback
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
