/** @type {import('next').NextConfig} */
import utilies from './app/utilies';
const path = require('path');
const nextConfig = {
  output: 'export',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  basePath: 'app',
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app'),
    };

    return config;
  },
};

module.exports = nextConfig;
