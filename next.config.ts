import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "apilumora.rivetsoft.com" },
      { protocol: "https", hostname: "lumora.rivetsoft.com" },
      { protocol: "https", hostname: "lumora-treks-fe.vercel.app" },
      { protocol: "https", hostname: "garage.travories.com" },
      { protocol: "https", hostname: "travories-public.files.travories.com" },
      { protocol: "http", hostname: "localhost", port: "8000" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000" },
    ],


  },
};

export default nextConfig;
