/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        utilies: 'empty',
      };
    }

    return config;
  },
};

module.exports = nextConfig;
