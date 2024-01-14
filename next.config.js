/** @type {import('next').NextConfig} */
// const path = require('path');
const nextConfig = {
  output: 'export',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  // Use the prefix for GitHub Pages
  basePath: '/crypto-dashboard',
  assetPrefix: '/crypto-dashboard/',
  // Enable static export
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // basePath: 'app',
  // webpack: (config, { isServer }) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@': path.resolve(__dirname, 'app'),
  //   };
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       utilies: 'app/utilies',
  //     };
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
