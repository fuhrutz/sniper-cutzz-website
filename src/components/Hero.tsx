'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';

const stats = (t: ReturnType<typeof useApp>['t']) => [
  { value: t.hero.stat_clients, icon: '✂' },
  { value: t.hero.stat_rating,  icon: '★' },
  { value: t.hero.stat_locations, icon: '📍' },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero({ onBookClick }: { onBookClick: () => void }) {
  const { t } = useApp();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden animated-gradient noise-overlay"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(204,255,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,255,0,0.08) 0%, transparent 70%)',
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
      >
        {/* Pre-title badge */}
        <motion.div variants={fadeUp} className="mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] rounded-full border"
            style={{
              fontFamily: "'Outfit', sans-serif",
              background: 'rgba(204,255,0,0.08)',
              border: '1px solid rgba(204,255,0,0.25)',
              color: '#CCFF00',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            Premium Barbershop · LUX &amp; PT
          </span>
        </motion.div>

        {/* Main Logo Text */}
        <motion.div variants={fadeUp} className="relative">
          <h1
            className="font-heading leading-[0.85] select-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(5rem, 18vw, 14rem)',
              letterSpacing: '0.04em',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(204,255,0,0.15)',
              position: 'absolute',
              top: '6px',
              left: '6px',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            SNIPER
          </h1>
          <h1
            className="font-heading leading-[0.85]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(5rem, 18vw, 14rem)',
              letterSpacing: '0.04em',
              color: '#F2F2F2',
              textShadow: '0 0 80px rgba(204,255,0,0.2)',
            }}
          >
            SNIPER
          </h1>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-heading -mt-2 mb-6"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            letterSpacing: '0.5em',
            color: '#CCFF00',
            textShadow: '0 0 40px rgba(204,255,0,0.4)',
          }}
        >
          CUTZZ
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg lg:text-xl mb-10 max-w-xl tracking-wide"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: 'rgba(242,242,242,0.7)',
            letterSpacing: '0.05em',
          }}
        >
          {t.hero.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(204,255,0,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookClick}
            className="px-8 py-4 font-semibold text-sm uppercase tracking-widest rounded-sm"
            style={{
              fontFamily: "'Outfit', sans-serif",
              background: '#CCFF00',
              color: '#111111',
              boxShadow: '0 0 25px rgba(204,255,0,0.3)',
            }}
          >
            {t.hero.cta_book}
          </motion.button>
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 font-semibold text-sm uppercase tracking-widest rounded-sm transition-colors"
            style={{
              fontFamily: "'Outfit', sans-serif",
              background: 'transparent',
              color: '#F2F2F2',
              border: '1px solid rgba(242,242,242,0.25)',
            }}
          >
            {t.hero.cta_work}
          </motion.a>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {stats(t).map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span className="text-lg">{stat.icon}</span>
              <span
                className="text-sm font-semibold tracking-wider"
                style={{ fontFamily: "'Outfit', sans-serif", color: '#F2F2F2' }}
              >
                {stat.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: 'rgba(242,242,242,0.4)', fontFamily: "'Outfit', sans-serif" }}
        >
          Scroll
        </span>
        <div className="bounce-scroll">
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="rgba(204,255,0,0.4)" strokeWidth="1.5" />
            <motion.rect
              x="9" y="6" width="2" height="6" rx="1" fill="#CCFF00"
              animate={{ y: [6, 14, 6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </section>
  );
}
