import '@/lib/polyfills'
import type React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import { BrowserCompatibilityDetector } from '@/components/layout/BrowserCompatibilityDetector'
import ErrorBoundary from '@/components/layout/ErrorBoundary'
import GlobalTransition from '@/components/transitions/GlobalTransition'
import ScrollToTop from '@/components/layout/ScrollToTop'
import StructuredData from '@/components/seo/StructuredData'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

// Configure IBM Plex Sans - optimized with swap for better LCP
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '600'], // Reduced weights for smaller bundle
  variable: '--font-ibm-plex-sans',
  display: 'swap', // Changed from optional to swap for better LCP
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
})

// Configure IBM Plex Mono - optimized with swap
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'], // Reduced weights for smaller bundle
  variable: '--font-ibm-plex-mono',
  display: 'swap', // Changed from optional to swap for better LCP
  preload: true,
  fallback: ['Monaco', 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: {
    default: 'DevX Group - Elite Software Development Team | Custom Applications & AI Solutions',
    template: '%s | DevX Group'
  },
  description: 'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation. Build, launch, and scale your vision with our expert team.',
  keywords: ['software development', 'custom applications', 'AI solutions', 'ML', 'IoT', 'digital transformation', 'web development', 'mobile apps', 'San Diego'],
  authors: [{ name: 'DevX Group LLC' }],
  creator: 'DevX Group LLC',
  publisher: 'DevX Group LLC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devxgroup.io',
    siteName: 'DevX Group',
    title: 'DevX Group - Elite Software Development Team | Custom Applications & AI Solutions',
    description: 'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation.',
    images: [
      {
        url: 'https://devxgroup.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DevX Group - Elite Software Development Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevX Group - Elite Software Development Team',
    description: 'Elite software development services including custom applications, AI/ML solutions, and digital transformation.',
    images: ['https://devxgroup.io/twitter-image.jpg'],
    creator: '@devxgroup',
    site: '@devxgroup',
  },
  verification: {
    google: 'verification_token_here',
  },
  alternates: {
    canonical: 'https://devxgroup.io',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#4CD787' }
    ]
  },
  other: {
    'msapplication-TileColor': '#4CD787',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#4CD787',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TBDBXQWX'
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-GXG9QQLB7C'

  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} dark`} style={{ backgroundColor: '#000000' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        {/* Resource hints for better performance */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical font for LCP */}
        <link
          rel="preload"
          href="/fonts/IBMPlexMono-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" />
        <StructuredData type="website" />
      </head>
      <body className="bg-black text-white font-sans antialiased" style={{ backgroundColor: '#000000', transition: 'none', paddingTop: '64px' }} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager - Deferred for better performance */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
            `.trim()
          }}
        />

        {/* Google Analytics 4 - Deferred for better performance */}
        <Script
          id="ga-script"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <Script
          id="ga-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', {
  page_path: window.location.pathname,
  send_page_view: true
});
            `.trim()
          }}
        />

        <BrowserCompatibilityDetector />
        <ErrorBoundary>
          <div style={{ backgroundColor: '#000000' }} suppressHydrationWarning>
            <ConditionalLayout>{children}</ConditionalLayout>
            <ScrollToTop />
            <GlobalTransition />
          </div>
        </ErrorBoundary>
        <SpeedInsights />
      </body>
    </html>
  )
}
