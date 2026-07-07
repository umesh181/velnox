import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Keep Next.js scoped to this app folder (avoids wrong root when parent has lockfiles)
  outputFileTracingRoot: __dirname,
  // Relative asset prefix only used for local file:// preview builds
  ...(process.env.RELATIVE_ASSETS ? { assetPrefix: './' } : {}),
  webpack: (config, { dev }) => {
    // Prevent stale chunk references (e.g. missing ./611.js) during hot reload
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
