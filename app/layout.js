import './globals.css';
import JsonLd from '@/components/seo/JsonLd';
import {
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  SITE,
} from '@/lib/seo/config';

const title = {
  default: `Velnox Digital Agency | Web Design, Apps & SEO — velnox.work`,
  template: `%s | Velnox®`,
};

export const metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  applicationName: SITE.name,
  category: 'Digital Agency',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
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
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: `${SITE.name}® Digital Agency`,
    title: title.default,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: SITE.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Web design, app development & SEO agency`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    title: title.default,
    description: DEFAULT_DESCRIPTION,
    images: [SITE.defaultOgImage],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
    shortcut: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  ...(SITE.googleSiteVerification
    ? { verification: { google: SITE.googleSiteVerification } }
    : {}),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2efe9' },
    { media: '(prefers-color-scheme: dark)', color: '#141412' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang={SITE.language}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Dancing+Script:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="author" href="/humans.txt" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM context" />
      </head>
      <body>
        <a
          href="#main-content"
          className="absolute left-[-9999px] top-4 z-[9999] rounded-lg bg-ink px-4 py-2 text-bg focus:left-4"
        >
          Skip to main content
        </a>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
