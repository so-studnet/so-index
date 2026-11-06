import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的サイトとして書き出す（npm run build で out/ に HTML が出る）
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
