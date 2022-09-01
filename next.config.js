/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@/components/*': ['components/*'],
    },
  },
  reactStrictMode: true,
  images: {
    domains: [
      'i.etsystatic.com',
      'www.covalenthq.com',
      'logos.covalenthq.com',
      'pbs.twimg.com',
      'assets.poap.xyz',
      'avatars.githubusercontent.com',
      'ipfs.io',
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
}

module.exports = nextConfig
