import { withSentryConfig } from "@sentry/nextjs";
import bundleAnalyzer from '@next/bundle-analyzer'
import path from 'node:path'

// Some third-party bundles expect a `self` global, even during server-side
// execution. Define it when running inside Node to prevent ReferenceErrors
// during the Next.js build step.
if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  Object.defineProperty(globalThis, 'self', {
    value: globalThis,
    configurable: true,
    enumerable: false,
    writable: true,
  })
}

try {
  if (typeof globalThis !== 'undefined' && typeof self === 'undefined') {
    // eslint-disable-next-line no-new-func
    Function('self = this').call(globalThis)
  }
} catch {
  // Ignore if the environment already defines `self` or disallows assignment.
}

if (typeof globalThis !== 'undefined' && typeof globalThis.webpackChunk_N_E === 'undefined') {
  globalThis.webpackChunk_N_E = []
}

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-icons', 'three', '@react-three/fiber', '@react-three/drei'],
  },
  // Target modern browsers - avoid legacy polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false, // Enable Next.js image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
      {
        pathname: '/images/**',
        search: '?v=*',
      },
      {
        pathname: '/images/**',
        search: '?*',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 60, 70, 75, 85, 90, 95, 100],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Security headers
  async headers() {
    return [
      {
        source: '/:all*(js|css|svg|png|jpg|jpeg|gif|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://tagmanager.google.com https://assets.calendly.com https://js.stripe.com https://cdn.segment.io https://www.recaptcha.net https://www.gstatic.com https://connect.facebook.net https://cdn.sprig.com https://cdn.pendo.io https://data.pendo.io https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://hebbkx1anhila5yf.public.blob.vercel-storage.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.calendly.com https://data.pendo.io https://*.ingest.us.sentry.io https://vitals.vercel-insights.com https://va.vercel-scripts.com",
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
  // Enhanced webpack settings for better performance
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      config.output = config.output || {}
      config.output.globalObject = 'globalThis'
    }
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    // Optimize production builds (client-side only)
    if (!dev && !isServer) {
      // Enable tree-shaking
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        usedExports: true, // Enable tree-shaking
        sideEffects: true, // Respect package.json sideEffects
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
              maxSize: 244000, // Split if larger than 244KB
            },
            // Separate chunk for common/shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Three.js in separate chunk with size limit
            three: {
              name: 'three',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
              maxSize: 150000, // Split if larger than 150KB
            },
            // Framer Motion in separate chunk
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            // Radix UI in separate chunk
            radix: {
              name: 'radix',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    if (isServer) {
      const originalEntry = config.entry
      const polyfillPath = path.join(process.cwd(), 'src/lib/server-self-polyfill.ts')

      config.entry = async () => {
        const resolvedEntry =
          typeof originalEntry === 'function' ? await originalEntry() : originalEntry
        const entries = Array.isArray(resolvedEntry) || typeof resolvedEntry === 'object'
          ? resolvedEntry
          : {}

        if (entries && typeof entries === 'object') {
          for (const key of Object.keys(entries)) {
            const entryValue = entries[key]

            if (Array.isArray(entryValue)) {
              if (!entryValue.includes(polyfillPath)) {
                entries[key] = [polyfillPath, ...entryValue]
              }
            } else if (entryValue && typeof entryValue === 'object') {
              if (Array.isArray(entryValue.import) && !entryValue.import.includes(polyfillPath)) {
                entryValue.import.unshift(polyfillPath)
              }
            }
          }
        }

        return entries
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

  // Disable automatic client instrumentation to fix Next.js 15.5.4 compatibility
  autoInstrumentAppDirectory: false,
};

// Only run the webpack plugin (which performs network calls) when CI is present
const enableSentryWebpackPlugin = process.env.CI === "true" || process.env.CI === "1";

const configWithAnalyzer = withBundleAnalyzer(nextConfig)

const exportedConfig = enableSentryWebpackPlugin
  ? withSentryConfig(configWithAnalyzer, sentryWebpackPluginOptions)
  : configWithAnalyzer;

export default exportedConfig;
