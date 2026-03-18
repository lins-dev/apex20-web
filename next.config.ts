import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // turbopack: {} — ativado via flag no host (npm run dev usa Turbopack por padrão no Next.js 16)
  // No Docker, o compose usa --webpack + WATCHPACK_POLLING para hot reload via bind mount
};

export default nextConfig;
