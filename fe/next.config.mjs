/** @type {import('next').NextConfig} */
const nextConfig = {
   webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    })
    return config
  },
  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60*60*24*7,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dropbox.com',
      },
    ],
  },
};

export default nextConfig;
