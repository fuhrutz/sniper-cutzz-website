'use client';

import { useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '@/lib/context';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroScene = dynamic(() => import('./three/HeroScene'), { ssr: false });

export default function Hero3D({ onBookClick }: { onBookClick: () => void }) {
  const { t } = useApp();

  const sectionRef = useRef<HTMLElement>(null!);
  const canvasRef  = useRef<HTMLDivElement>(null!);
  const bottomRef  = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(canvasRef.current, {
        opacity: 0,
        y: 24,
        duration: 1.1,
        ease: 'power3.out',
      }).from(
        bottomRef.current,
        { opacity: 0, y: 18, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  const stats = [
    { value: t.hero.stat_clients,   icon: '✂' },
    { value: t.hero.stat_rating,    icon: '★' },
    { value: t.hero.stat_locations, icon: '📍' },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        /* Radial gradient: dark charcoal center → pure black edges */
        background:
          'radial-gradient(ellipse at 50% 40%, #0f1a00 0%, #050505 60%, #000000 100%)',
      }}
    >
      {/* Subtle green glow behind the logo position only */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '38%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '280px',
          background:
            'radial-gradient(ellipse, rgba(204,255,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── 3D Logo Canvas (60vh) ── */}
      <div
        ref={canvasRef}
        style={{
          width: '100%',
          height: '60vh',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* ── CTAs + Stats ── */}
      <div
        ref={bottomRef}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingBottom: '3rem',
        }}
      >
        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onBookClick}
            style={{
              padding: '1rem 2rem',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: '#CCFF00',
              color: '#111111',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 0 30px rgba(204,255,0,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 45px rgba(204,255,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(204,255,0,0.35)';
            }}
          >
            {t.hero.cta_book}
          </button>

          <a
            href="#portfolio"
            style={{
              padding: '1rem 2rem',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'transparent',
              color: '#F2F2F2',
              border: '1px solid rgba(242,242,242,0.2)',
              borderRadius: '2px',
              transition: 'transform 0.2s, border-color 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.borderColor = 'rgba(242,242,242,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(242,242,242,0.2)';
            }}
          >
            {t.hero.cta_work}
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '0.75rem',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span style={{ fontSize: '1rem' }}>{stat.icon}</span>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#F2F2F2',
                }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(242,242,242,0.3)',
          }}
        >
          Scroll
        </span>
        <div className="bounce-scroll">
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="rgba(204,255,0,0.3)" strokeWidth="1.5" />
            <rect x="9" y="6" width="2" height="6" rx="1" fill="#CCFF00">
              <animate attributeName="y" values="6;14;6" dur="1.5s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </div>

      {/* Gradient blending into next section */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
