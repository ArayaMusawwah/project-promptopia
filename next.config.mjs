/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },

  async rewrites() {
    return [
      {
        source: '/api/authors/:id/posts',
        destination: '/api/authors/[id]/posts',
      },
    ]
  },
}

export default nextConfig
