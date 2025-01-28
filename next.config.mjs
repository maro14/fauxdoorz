import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // ✅ Convert to ES module format

const nextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    domains: ['localhost'],
  },

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname); // ✅ Now works in `.mjs`
    return config;
  },
};

export default nextConfig;
