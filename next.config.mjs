/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ferrite.in',
      },
    ],
  },
  // Seamlessly redirect legacy /industries route to new /blog section
  async redirects() {
    return [
      {
        source: '/industries',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
  // Suppress Windows system-file Watchpack EINVAL errors in dev
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        'C:/DumpStack.log.tmp',
        'C:/hiberfil.sys',
        'C:/pagefile.sys',
        'C:/swapfile.sys',
      ],
    };
    return config;
  },
};

export default nextConfig;
