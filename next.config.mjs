/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Relative asset prefix only used for local file:// preview builds
  ...(process.env.RELATIVE_ASSETS ? { assetPrefix: './' } : {}),
};

export default nextConfig;
