import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // turbopack: {} — ativado via flag no host (npm run dev usa Turbopack por padrão no Next.js 16)
  // No Docker, o compose usa --webpack + WATCHPACK_POLLING para hot reload via bind mount

  // Proxy das chamadas ConnectRPC pelo servidor Next.js para o backend.
  // O browser aponta para /connect/* (mesmo host), o Node.js resolve apex20-backend internamente.
  async rewrites() {
    const backendUrl =
      process.env.INTERNAL_API_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      "http://localhost:8787";
    return [
      {
        source: "/connect/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
