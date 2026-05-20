'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/context';

const videos = [
  { id: 1, title: 'Skin Fade Masterclass', duration: '2:34' },
  { id: 2, title: 'Beard Sculpting Art', duration: '1:58' },
  { id: 3, title: 'Full Transformation', duration: '3:12' },
];

export default function Portfolio() {
  const { t } = useApp();
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className="section-padding relative"
      style={{ background: 'var(--bg)' }}
    >
      {/* Ambient decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(204,255,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.25em] mb-4 block"
            style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}
          >
            Our Portfolio
          </span>
          <h2
            className="font-heading mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              letterSpacing: '0.04em',
              color: 'var(--fg)',
              lineHeight: 1,
            }}
          >
            {t.portfolio.title}
          </h2>
          <p className="text-base" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative group rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '9/16',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                maxHeight: '420px',
              }}
            >
              {/* Placeholder background with gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, #1a1a1a 0%, #0d1500 60%, #111111 100%)`,
                }}
              />

              {/* Grid lines decoration */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(204,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.3) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Crosshair decoration */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="90" stroke="#CCFF00" strokeWidth="1" />
                  <line x1="100" y1="10" x2="100" y2="190" stroke="#CCFF00" strokeWidth="0.5" />
                  <line x1="10" y1="100" x2="190" y2="100" stroke="#CCFF00" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Duration badge */}
              <div
                className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-xs font-semibold z-10"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  color: '#F2F2F2',
                  fontFamily: "'Outfit', sans-serif",
                  backdropFilter: 'blur(8px)',
                }}
              >
                {video.duration}
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPlaying(playing === video.id ? null : video.id)}
                  aria-label={playing === video.id ? `Pause ${video.title}` : `Play ${video.title}`}
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
                  style={{
                    background: playing === video.id ? '#CCFF00' : 'rgba(204,255,0,0.15)',
                    border: '2px solid rgba(204,255,0,0.6)',
                    boxShadow: '0 0 30px rgba(204,255,0,0.3)',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {playing === video.id ? (
                      <motion.svg
                        key="pause"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        width="20" height="20" viewBox="0 0 24 24" fill={playing === video.id ? '#111' : '#CCFF00'}
                      >
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="play"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        width="20" height="20" viewBox="0 0 24 24"
                      >
                        <polygon points="5,3 19,12 5,21" fill="#CCFF00" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.button>

                <span
                  className="text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: 'rgba(242,242,242,0.7)', fontFamily: "'Outfit', sans-serif" }}
                >
                  {t.portfolio.play}
                </span>
              </div>

              {/* Title overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 z-10"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
              >
                <p
                  className="font-heading text-xl"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--fg)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {video.title}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'rgba(242,242,242,0.5)', fontFamily: "'Outfit', sans-serif" }}
                >
                  Sniper Cutzz
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.a
            href="https://instagram.com/sniper_cutzz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Sniper Cutzz on Instagram (opens in new tab)"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(204,255,0,0.25)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold uppercase tracking-wider text-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
            style={{
              fontFamily: "'Outfit', sans-serif",
              background: 'var(--card)',
              border: '1px solid rgba(204,255,0,0.25)',
              color: '#CCFF00',
            }}
          >
            {/* Instagram Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="#CCFF00" />
            </svg>
            @sniper_cutzz · {t.portfolio.follow}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
