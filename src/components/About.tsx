'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '@/lib/context';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const skills = (t: ReturnType<typeof useApp>['t']) => [
  { label: t.about.skill_precision, value: 98 },
  { label: t.about.skill_style, value: 95 },
  { label: t.about.skill_satisfaction, value: 100 },
];

function SkillBar({ label, value, index }: { label: string; value: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--fg)' }}
        >
          {label}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 + index * 0.15 }}
          className="text-sm font-bold"
          style={{ color: '#CCFF00', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem' }}
        >
          {value}%
        </motion.span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #CCFF00, #88aa00)' }}
        />
      </div>
    </div>
  );
}

function BarberCard({
  name,
  role,
  bio,
  index,
}: {
  name: string;
  role: string;
  bio: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, borderColor: 'rgba(204,255,0,0.4)' }}
      className="p-5 rounded-xl transition-all duration-300"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Avatar placeholder */}
      <div className="w-12 h-12 rounded-full mb-3 flex items-center justify-center text-lg font-bold"
        style={{ background: 'rgba(204,255,0,0.1)', color: '#CCFF00', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem' }}>
        {name[0]}
      </div>
      <h4
        className="font-heading text-xl mb-0.5"
        style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--fg)', letterSpacing: '0.05em' }}
      >
        {name}
      </h4>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}>
        {role}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
        {bio}
      </p>
    </motion.div>
  );
}

export default function About() {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<'lux' | 'pt'>('lux');

  const barbers = activeTab === 'lux' ? t.about.lux_barbers : t.about.pt_barbers;

  return (
    <section id="about" className="section-padding relative" style={{ background: 'var(--bg)' }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-[0.03]"
        style={{ background: 'radial-gradient(ellipse at right, #CCFF00, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.25em] mb-4 block"
                style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}
              >
                Our Story
              </span>
              <h2
                className="font-heading mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                  color: 'var(--fg)',
                }}
              >
                {t.about.title}
              </h2>
              <p
                className="text-base mb-4 font-semibold"
                style={{ fontFamily: "'Outfit', sans-serif", color: '#CCFF00' }}
              >
                {t.about.subtitle}
              </p>
              <p
                className="text-base leading-relaxed mb-10"
                style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--muted)', maxWidth: '480px' }}
              >
                {t.about.body}
              </p>

              {/* Location Tabs */}
              <div className="mb-6">
                <div
                  className="inline-flex rounded-lg p-1 gap-1"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  {(['lux', 'pt'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-5 py-2 text-sm font-semibold uppercase tracking-wider rounded-md transition-all duration-250"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        background: activeTab === tab ? '#CCFF00' : 'transparent',
                        color: activeTab === tab ? '#111111' : 'var(--muted)',
                      }}
                    >
                      {tab === 'lux' ? t.about.tab_lux : t.about.tab_pt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Barber Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {(barbers as unknown as Array<{ name: string; role: string; bio: string }>).map((b, i) => (
                  <BarberCard key={b.name} name={b.name} role={b.role} bio={b.bio} index={i} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column — Skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:sticky lg:top-24"
          >
            {/* Large decorative text */}
            <div
              className="font-heading mb-8 leading-none select-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(6rem, 14vw, 11rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(204,255,0,0.08)',
                letterSpacing: '0.04em',
                lineHeight: 0.9,
              }}
            >
              <div>OUR</div>
              <div style={{ color: 'rgba(204,255,0,0.05)', WebkitTextStroke: '1px rgba(204,255,0,0.12)' }}>
                CRAFT
              </div>
            </div>

            <h3
              className="font-heading text-3xl md:text-4xl mb-10"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: '0.08em',
                color: 'var(--fg)',
              }}
            >
              {t.about.skills_title}
            </h3>

            <div className="flex flex-col gap-8">
              {skills(t).map((s, i) => (
                <SkillBar key={s.label} label={s.label} value={s.value} index={i} />
              ))}
            </div>

            {/* Decorative stats */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { n: '4+', label: 'Years Experience' },
                { n: '2', label: 'Locations' },
                { n: '500+', label: 'Happy Clients' },
                { n: '100%', label: 'Satisfaction' },
              ].map((stat) => (
                <div
                  key={stat.n}
                  className="p-5 rounded-xl flex flex-col gap-1"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <span
                    className="font-heading text-3xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#CCFF00', letterSpacing: '0.04em' }}
                  >
                    {stat.n}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
