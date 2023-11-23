/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withBundleAnalyzer({
   reactStrictMode: true,
   webpack: (config) => {
      config.resolve.fallback = { fs: false, net: false, tls: false }
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
   },
})

module.exports = nextConfig
