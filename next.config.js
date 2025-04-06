/** @type {import('next').NextConfig} */

const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize output for production
  swcMinify: true,

  // Power JavaScript compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize image handling
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },

  // Transpile specific packages if needed
  transpilePackages: [],

  // TypeScript settings for build process
  typescript: {
    // Build will succeed even with TypeScript errors in production
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },

  async redirects() {
    return [
      {
        source: '/sign-in',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/api/auth/register',
        permanent: true,
      },
    ]
  },

  // experimental: {
  //   serverActions: true,
  // },
  
    
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;
