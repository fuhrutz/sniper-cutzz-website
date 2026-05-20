import type { Metadata } from 'next';
import { Bebas_Neue, Outfit } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/context';
import { LenisProvider } from '@/lib/lenis';

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const SITE_URL = 'https://sniper-cutzz.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sniper Cutzz | Precision Cuts. Premium Experience.',
    template: '%s | Sniper Cutzz',
  },
  description:
    'Premium barbershop in Luxembourg and Portugal. Expert haircuts, beard trims, and grooming services. Book online or via WhatsApp.',
  keywords: [
    'barbershop Luxembourg',
    'barber Luxembourg',
    'haircut Luxembourg',
    'beard trim Luxembourg',
    'coiffeur Luxembourg',
    'barbeiro Portugal',
    'Sniper Cutzz',
    'premium barber',
    'skin fade',
    'grooming',
  ],
  authors: [{ name: 'Sniper Cutzz' }],
  creator: 'Vision2Studio',
  publisher: 'Sniper Cutzz',
  openGraph: {
    title: 'Sniper Cutzz — Precision Cuts. Premium Experience.',
    description:
      'Premium barbershop in Luxembourg and Portugal. Expert haircuts, beard trims, and grooming services.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Sniper Cutzz',
    locale: 'en_LU',
    alternateLocale: ['fr_LU', 'pt_PT'],
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sniper Cutzz Barbershop — Precision Cuts. Premium Experience.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sniper Cutzz — Precision Cuts. Premium Experience.',
    description: 'Premium barbershop in Luxembourg and Portugal.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: undefined, // add Google Search Console token when available
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HairSalon',
      '@id': `${SITE_URL}/#hairsalon`,
      name: 'Sniper Cutzz',
      description:
        'Premium barbershop offering expert haircuts, beard trims, and grooming services in Luxembourg and Portugal.',
      url: SITE_URL,
      telephone: '+352691341915',
      image: `${SITE_URL}/og-image.jpg`,
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Cash, Card',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Barbershop Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Haircut' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Beard Trim' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Haircut + Beard Combo' },
          },
        ],
      },
      address: [
        {
          '@type': 'PostalAddress',
          addressCountry: 'LU',
          addressLocality: 'Luxembourg',
          description: 'Luxembourg location',
        },
        {
          '@type': 'PostalAddress',
          addressCountry: 'PT',
          description: 'Portugal location',
        },
      ],
      sameAs: ['https://www.instagram.com/sniper_cutzz/'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Sniper Cutzz',
      publisher: { '@id': `${SITE_URL}/#hairsalon` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${outfit.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <AppProvider>
          <LenisProvider>{children}</LenisProvider>
        </AppProvider>
      </body>
    </html>
  );
}
