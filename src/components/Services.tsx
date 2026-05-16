'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/context';

const luxServices = (t: ReturnType<typeof useApp>['t']) => [
  {
    id: 'haircut',
    icon: '✂',
    title: t.services.haircut,
    price: '€30',
    description: 'Precision fade or scissor cut, tailored to your style. Includes hot towel finish.',
    popular: false,
  },
  {
    id: 'beard',
    icon: '🪒',
    title: t.services.beard,
    price: '€15',
    description: 'Shape, edge and define your beard. Hot towel shave finish included.',
    popular: false,
  },
  {
    id: 'combo',
    icon: '💎',
    title: t.services.combo,
    price: '€35',
    description: 'The full Sniper experience. Premium haircut + beard trim combo.',
    popular: true,
  },
];

const ptServices = (t: ReturnType<typeof useApp>['t']) => [
  {
    id: 'haircut',
    icon: '✂',
    title: t.services.haircut,
    price: '€13',
    description: 'Precision fade or scissor cut, tailored to your style. Includes hot towel finish.',
    popular: false,
  },
  {
    id: 'beard',
    icon: '🪒',
    title: t.services.beard,
    price: '€7',
    description: 'Shape, edge and define your beard. Hot towel shave finish included.',
    popular: false,
  },
  {
    id: 'combo',
    icon: '💎',
    title: t.services.combo,
    price: '€16',
    description: 'The full Sniper experience. Premium haircut + beard trim combo.',
    popular: true,
  },
];

export default function Services({ onBookClick }: { onBookClick: () => void }) {
  const { t } = useApp();
  const [location, setLocation] = useState<'lux' | 'pt'>('lux');
  const services = location === 'lux' ? luxServices(t) : ptServices(t);

  return (
    <section
      id="services"
      className="section-padding relative"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, #0d150a 50%, var(--bg) 100%)' }}
    >
      {/* Crosshair decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="280" stroke="#CCFF00" strokeWidth="1" fill="none" />
          <circle cx="300" cy="300" r="200" stroke="#CCFF00" strokeWidth="0.5" fill="none" />
          <line x1="300" y1="0" x2="300" y2="600" stroke="#CCFF00" strokeWidth="0.5" />
          <line x1="0" y1="300" x2="600" y2="300" stroke="#CCFF00" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.25em] mb-4 block"
            style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}
          >
            What We Offer
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
            {t.services.title}
          </h2>
          <p className="text-base" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Location Toggle */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex rounded-lg p-1 gap-1"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            {(['lux', 'pt'] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                className="px-8 py-3 rounded-md font-semibold uppercase tracking-wider text-sm transition-all duration-300"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: location === loc ? '#CCFF00' : 'transparent',
                  color: location === loc ? '#111111' : 'var(--muted)',
                  boxShadow: location === loc ? '0 0 20px rgba(204,255,0,0.2)' : 'none',
                }}
              >
                {loc === 'lux' ? '🇱🇺 Luxembourg' : '🇵🇹 Portugal'}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(204,255,0,0.5)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(204,255,0,0.1)',
                }}
                className="relative p-8 rounded-2xl flex flex-col gap-5 transition-all duration-300"
                style={{
                  background: service.popular
                    ? 'linear-gradient(135deg, rgba(204,255,0,0.08), rgba(204,255,0,0.03))'
                    : 'var(--card)',
                  border: service.popular ? '1px solid rgba(204,255,0,0.3)' : '1px solid var(--border)',
                }}
              >
                {service.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full"
                    style={{ background: '#CCFF00', color: '#111111', fontFamily: "'Outfit', sans-serif" }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: service.popular ? 'rgba(204,255,0,0.15)' : 'var(--border)',
                  }}
                >
                  {service.icon}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-heading text-2xl"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: '0.06em',
                      color: 'var(--fg)',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between">
                  <span
                    className="font-heading text-4xl"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: '#CCFF00',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {service.price}
                  </span>
                  <button
                    onClick={onBookClick}
                    className="px-5 py-2.5 font-semibold text-xs uppercase tracking-widest rounded-sm transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      background: service.popular ? '#CCFF00' : 'transparent',
                      color: service.popular ? '#111111' : '#CCFF00',
                      border: service.popular ? 'none' : '1px solid rgba(204,255,0,0.4)',
                    }}
                  >
                    {t.services.book_btn}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
