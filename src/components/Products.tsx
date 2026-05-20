'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';

const products = [
  {
    id: 1,
    name: 'Spray Sea Salt',
    price: '€20',
    emoji: '🌊',
    description: 'Natural sea salt spray for effortless beach waves and texture.',
    color: '#0a1a2a',
  },
  {
    id: 2,
    name: 'Styling Powder',
    price: '€20',
    emoji: '✨',
    description: 'Volumizing powder for instant lift and matte finish.',
    color: '#1a1a0a',
  },
  {
    id: 3,
    name: 'Cera Pomade',
    price: '€20',
    emoji: '💎',
    description: 'High-shine wax pomade for slick, classic styles.',
    color: '#1a0a0a',
  },
  {
    id: 4,
    name: 'Sérum de Barba',
    price: '€20',
    emoji: '🧴',
    description: 'Nourishing beard serum for softness and shine.',
    color: '#0a1a0a',
  },
  {
    id: 5,
    name: 'Creme Pomade',
    price: '€20',
    emoji: '🌿',
    description: 'Light-hold cream pomade for natural, flexible styles.',
    color: '#1a1505',
  },
  {
    id: 6,
    name: 'Creme Amaciador',
    price: '€20',
    emoji: '💧',
    description: 'Conditioning hair cream for smoothness and hydration.',
    color: '#0a0f1a',
  },
];

export default function Products() {
  const { t } = useApp();

  return (
    <section
      id="products"
      className="section-padding relative"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, #0a0e05 50%, var(--bg) 100%)' }}
    >
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
            Sniper Store
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
            {t.products.title}
          </h2>
          <p className="text-base" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
            {t.products.subtitle}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -6,
                borderColor: 'rgba(204,255,0,0.4)',
                boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
              }}
              className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Product visual */}
              <div
                className="relative flex items-center justify-center py-10"
                style={{ background: product.color }}
              >
                {/* Badge */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(204,255,0,0.15)',
                    border: '1px solid rgba(204,255,0,0.3)',
                    color: '#CCFF00',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {t.products.stock}
                </div>

                {/* Emoji product icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [-3, 3, -3, 0] }}
                  transition={{ duration: 0.4 }}
                  aria-hidden="true"
                  className="text-6xl select-none"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(204,255,0,0.2))' }}
                >
                  {product.emoji}
                </motion.div>

                {/* Background crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="55" stroke="#CCFF00" strokeWidth="0.8" />
                    <line x1="60" y1="5" x2="60" y2="115" stroke="#CCFF00" strokeWidth="0.5" />
                    <line x1="5" y1="60" x2="115" y2="60" stroke="#CCFF00" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-1">
                  <h3
                    className="font-heading text-2xl"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: '0.06em',
                      color: 'var(--fg)',
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}
                  >
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span
                    className="font-heading text-3xl"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: '#CCFF00',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {product.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`${t.products.buy} ${product.name}`}
                    className="px-5 py-2.5 font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      background: 'transparent',
                      color: '#CCFF00',
                      border: '1px solid rgba(204,255,0,0.35)',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2.5">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    {t.products.buy}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
