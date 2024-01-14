/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  webpack: (config, { isServer }) => {
    console.log(__dirname);
    config.resolve.alias['@'] = __dirname + 'app';
    return config;
  },
};

module.exports = nextConfig;
