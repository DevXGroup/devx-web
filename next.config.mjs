import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    qualities: [75, 100],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://tagmanager.google.com https://assets.calendly.com https://js.stripe.com https://cdn.segment.io https://www.recaptcha.net https://www.gstatic.com https://connect.facebook.net https://cdn.sprig.com https://cdn.pendo.io https://data.pendo.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://hebbkx1anhila5yf.public.blob.vercel-storage.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.calendly.com https://data.pendo.io https://*.ingest.us.sentry.io",
              "frame-src 'self' https://calendly.com https://js.stripe.com https://www.recaptcha.net",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; '),
          },
        ],
      },
    ]
  },
  // Enhanced HMR settings
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
}

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only upload source maps in production
  silent: process.env.NODE_ENV !== "production",

  // Upload source maps during build
  hideSourceMaps: true,
  disableLogger: true,

  // Automatically tree-shake Sentry logger statements
  widenClientFileUpload: true,

  // Tunnel Sentry requests through Next.js rewrite to avoid ad-blockers
  tunnelRoute: "/monitoring",

  // Disable Sentry during development builds
  autoInstrumentServerFunctions: process.env.NODE_ENV === "production",
  autoInstrumentMiddleware: process.env.NODE_ENV === "production",
};

// Export the config wrapped with Sentry
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
