import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
    resolveAlias: {
      "@x402/core/client": "./stubs/x402-core/client.js",
      "@x402/evm": "./stubs/x402-evm/index.js",
      "@x402/evm/exact/client": "./stubs/x402-evm/exact/client.js",
      "@x402/evm/upto/client": "./stubs/x402-evm/upto/client.js",
      "@x402/svm/exact/client": "./stubs/x402-svm/exact/client.js",
    },
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    contentDispositionType: "inline",
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
