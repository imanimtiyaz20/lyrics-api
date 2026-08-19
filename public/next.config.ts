import type { NextConfig } from "next";
import { execSync } from "child_process";
import pkg from "./package.json";

const version = pkg.version;

let gitSha = "unknown";
try {
  gitSha = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) { }

const nextConfig: NextConfig = {
  cacheComponents: false,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:8888"],
    },
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BUILD_ID: `${gitSha} (${version})`,
  },
};

export default nextConfig;
