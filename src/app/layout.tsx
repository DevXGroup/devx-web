/* eslint-disable @next/next/no-page-custom-font */
import '@/lib/polyfills'
import { version as reactVersion } from 'react'
import type { ReactNode } from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import { BrowserCompatibilityDetector } from '@/components/layout/BrowserCompatibilityDetector'
import { DevToolsErrorSuppressor } from '@/components/layout/DevToolsErrorSuppressor'
import ErrorBoundary from '@/components/layout/ErrorBoundary'
import GlobalTransition from '@/components/transitions/GlobalTransition'
import ScrollToTop from '@/components/layout/ScrollToTop'
import StructuredData from '@/components/seo/StructuredData'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { Partytown } from '@qwik.dev/partytown/react'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

// Self-hosted fonts via next/font for better performance
const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const siteUrl = getSiteUrl()
const defaultOgImage = createOgImageUrl(
  {
    title: 'DevX Group · Elite Product Engineers',
    subtitle: 'Custom Applications • Agentic AI • Cloud Modernization',
    focus: ['Product Engineering', 'Agentic Automation', 'Cloud Ops'],
  },
  siteUrl
)
const defaultTwitterImage = createTwitterImageUrl(
  {
    title: 'DevX Group · Elite Product Engineers',
    subtitle: 'Custom Applications • Agentic AI • Cloud Modernization',
    focus: ['Product Engineering', 'Agentic Automation', 'Cloud Ops'],
  },
  siteUrl
)

const devtoolsVersionPatchScript = `
(function () {
  var REACT_VERSION = ${JSON.stringify(reactVersion)};
  if (!REACT_VERSION) {
    return;
  }

  var ensureVersionString = function (target) {
    if (!target || typeof target !== 'object') {
      return;
    }
    var version =
      typeof target.version === 'string' ? target.version.trim() : '';
    if (!version) {
      target.version = REACT_VERSION;
    }
    var reconcilerVersion =
      typeof target.reconcilerVersion === 'string'
        ? target.reconcilerVersion.trim()
        : '';
    if (!reconcilerVersion) {
      target.reconcilerVersion = REACT_VERSION;
    }
  };

  var patchRenderers = function (hook) {
    var renderers = hook && (hook.renderers || hook._renderers);
    if (!renderers) {
      return;
    }
    if (typeof renderers.forEach === 'function') {
      try {
        renderers.forEach(ensureVersionString);
      } catch (_) {}
      return;
    }
    if (Array.isArray(renderers)) {
      for (var i = 0; i < renderers.length; i++) {
        ensureVersionString(renderers[i]);
      }
      return;
    }
    var keys = Object.keys(renderers);
    for (var j = 0; j < keys.length; j++) {
      ensureVersionString(renderers[keys[j]]);
    }
  };

  var patchHook = function (hook) {
    if (!hook || hook.__DEVX_REACT_SEMVER_PATCHED__) {
      return;
    }
    hook.__DEVX_REACT_SEMVER_PATCHED__ = true;

    var originalInject = typeof hook.inject === 'function' ? hook.inject : null;
    if (originalInject) {
      hook.inject = function (internals) {
        ensureVersionString(internals);
        return originalInject.call(this, internals);
      };
    }

    patchRenderers(hook);

    var subscribe = typeof hook.on === 'function' ? hook.on.bind(hook) : null;
    if (subscribe) {
      try {
        subscribe('renderer', function (renderer) {
          ensureVersionString(renderer);
        });
      } catch (_) {}
      try {
        subscribe('renderer-attached', function (id, renderer) {
          if (renderer) {
            ensureVersionString(renderer);
            return;
          }
          var renderers = hook.renderers || hook._renderers;
          if (!renderers) {
            return;
          }
          var resolvedRenderer =
            typeof renderers.get === 'function' ? renderers.get(id) : renderers[id];
          ensureVersionString(resolvedRenderer);
        });
      } catch (_) {}
    }
  };

  var applyPatch = function () {
    var hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (hook) {
      patchHook(hook);
    }
  };

  applyPatch();

  var descriptor = Object.getOwnPropertyDescriptor(
    window,
    '__REACT_DEVTOOLS_GLOBAL_HOOK__'
  );
  if (!descriptor || descriptor.configurable) {
    var currentHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
      configurable: true,
      enumerable: false,
      get: function () {
        return currentHook;
      },
      set: function (nextHook) {
        currentHook = nextHook;
        applyPatch();
      }
    });
  }
})();
`.trim()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    siteName: 'DevX Group',
    title: 'DevX Group - Elite Software Development Team | Custom Applications & AI Solutions',
    description: 'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation.',
    images: [
      {
        url: defaultOgImage,
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
    images: [defaultTwitterImage],
    creator: '@devxgroup',
    site: '@devxgroup',
  },
  verification: {
    google: 'verification_token_here',
  },
  alternates: {
    canonical: siteUrl,
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

export const revalidate = 60

export default function RootLayout({ children }: { children: ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TBDBXQWX'
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-GXG9QQLB7C'

  return (
    <html lang="en" className="dark" style={{ backgroundColor: '#000000' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        {/* Resource hints for better performance */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Patch React DevTools semver regression */}
        <Script
          id="react-devtools-semver-patch"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: devtoolsVersionPatchScript }}
        />
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" />
        <StructuredData type="website" />
        {/* Partytown for offloading third-party scripts */}
        <Partytown debug={false} forward={['dataLayer.push', 'gtag']} />
      </head>
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} bg-black text-white font-sans antialiased`} style={{ backgroundColor: '#000000', transition: 'none', paddingTop: '64px' }} suppressHydrationWarning>
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

        {/* Google Tag Manager - Run in web worker via Partytown */}
        <Script
          id="gtm-script"
          type="text/partytown"
          strategy="worker"
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

        {/* Google Analytics 4 - Run in web worker via Partytown */}
        <Script
          id="ga-script"
          type="text/partytown"
          strategy="worker"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <Script
          id="ga-config"
          type="text/partytown"
          strategy="worker"
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

        <DevToolsErrorSuppressor />
        <BrowserCompatibilityDetector />
        <ErrorBoundary>
          <div style={{ backgroundColor: '#000000' }} suppressHydrationWarning>
            <ConditionalLayout>{children}</ConditionalLayout>
            <ScrollToTop />
            <GlobalTransition />
          </div>
        </ErrorBoundary>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
