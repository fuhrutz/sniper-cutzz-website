'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/context';
import { Lang } from '@/lib/translations';

const LANGS: Lang[] = ['en', 'pt', 'fr', 'de'];

export default function Navbar({ onBookClick }: { onBookClick: () => void }) {
  const { t, lang, setLang, isDark, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.about,     href: '#about' },
    { label: t.nav.services,  href: '#services' },
    { label: t.nav.portfolio, href: '#portfolio' },
    { label: t.nav.products,  href: '#products' },
    { label: t.nav.reviews,   href: '#reviews' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(17,17,17,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(204,255,0,0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Sniper Cutzz"
              width={120}
              height={40}
              priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wider uppercase transition-colors duration-200 hover:text-[#CCFF00]"
                style={{ color: 'var(--fg)', fontFamily: "'Outfit', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Picker */}
            <div className="hidden sm:flex items-center gap-1">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2 py-1 text-xs font-semibold uppercase rounded transition-all duration-200"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: lang === l ? '#CCFF00' : 'transparent',
                    color: lang === l ? '#111111' : 'var(--muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Book Now Button */}
            <button
              onClick={onBookClick}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 font-semibold text-sm uppercase tracking-wider rounded-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: '#CCFF00',
                color: '#111111',
                boxShadow: '0 0 20px rgba(204,255,0,0.25)',
              }}
            >
              {t.nav.book}
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-0.5 w-5 origin-center"
                  style={{ background: '#CCFF00' }}
                  animate={
                    mobileOpen
                      ? i === 0
                        ? { rotate: 45, y: 8 }
                        : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -8 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.2 }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 py-6 px-6 flex flex-col gap-4"
            style={{
              background: 'rgba(17,17,17,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(204,255,0,0.1)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xl font-medium uppercase tracking-widest py-2 border-b hover:text-[#CCFF00] transition-colors"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: 'var(--fg)',
                  borderColor: 'var(--border)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setMobileOpen(false); }}
                  className="px-3 py-1.5 text-sm font-semibold uppercase rounded"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: lang === l ? '#CCFF00' : 'var(--card)',
                    color: lang === l ? '#111' : 'var(--muted)',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              onClick={() => { onBookClick(); setMobileOpen(false); }}
              className="mt-2 py-3 font-semibold text-sm uppercase tracking-wider rounded-sm"
              style={{ background: '#CCFF00', color: '#111111', fontFamily: "'Outfit', sans-serif" }}
            >
              {t.nav.book}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
