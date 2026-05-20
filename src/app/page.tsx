'use client';

import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/context';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import Hero3D from '@/components/Hero3D';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Products from '@/components/Products';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import FAB from '@/components/FAB';
import BookingModal from '@/components/Booking';
import CookieBanner from '@/components/CookieBanner';

export default function Home() {
  const { bookingOpen, setBookingOpen } = useApp();

  return (
    <>
      <Cursor />
      <Navbar onBookClick={() => setBookingOpen(true)} />

      <main>
        <Hero3D onBookClick={() => setBookingOpen(true)} />
        <About />
        <Services onBookClick={() => setBookingOpen(true)} />
        <Portfolio />
        <Products />
        <Reviews />
      </main>

      <Footer onBookClick={() => setBookingOpen(true)} />
      <FAB onClick={() => setBookingOpen(true)} />

      <AnimatePresence>
        {bookingOpen && (
          <BookingModal onClose={() => setBookingOpen(false)} />
        )}
      </AnimatePresence>

      <CookieBanner />
    </>
  );
}
