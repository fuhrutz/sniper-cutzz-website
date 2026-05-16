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

export const metadata: Metadata = {
  title: 'Sniper Cutzz | Precision Cuts. Premium Experience.',
  description: 'Premium barbershop in Luxembourg and Portugal. Expert haircuts, beard trims, and grooming services.',
  keywords: ['barbershop', 'Luxembourg', 'Portugal', 'haircut', 'beard', 'Sniper Cutzz'],
  openGraph: {
    title: 'Sniper Cutzz',
    description: 'Precision cuts. Premium experience.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${outfit.variable} dark`}>
      <body className="min-h-screen antialiased">
        <AppProvider>
          <LenisProvider>{children}</LenisProvider>
        </AppProvider>
      </body>
    </html>
  );
}
