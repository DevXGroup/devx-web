/Users/booly/Desktop/DevX-WebApp/next.config.cj
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
    serverActions: {},
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;