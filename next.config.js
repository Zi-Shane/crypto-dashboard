/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };

    return config;
  },
};

module.exports = nextConfig;
