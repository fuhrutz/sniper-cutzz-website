'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LegalPageWrapper({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: '#111111', minHeight: '100vh', color: '#F2F2F2' }}>
      {/* Minimal nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 h-14"
        style={{ background: 'rgba(17,17,17,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(204,255,0,0.06)' }}
      >
        <Link
          href="/"
          className="font-heading text-2xl tracking-widest transition-colors hover:text-[#CCFF00]"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#F2F2F2', letterSpacing: '0.1em' }}
        >
          SNIPER <span style={{ color: '#CCFF00' }}>CUTZZ</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-xs uppercase tracking-widest transition-colors hover:text-[#CCFF00]"
          style={{ color: '#4A4A4A', fontFamily: "'Outfit', sans-serif" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </Link>
      </nav>

      {/* Content */}
      <main className="pt-24 pb-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12 pb-8" style={{ borderBottom: '1px solid rgba(204,255,0,0.1)' }}>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}>
              Legal
            </p>
            <h1
              className="font-heading leading-none mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 8vw, 5rem)', letterSpacing: '0.04em', color: '#F2F2F2' }}
            >
              {title}
            </h1>
            <p className="text-sm" style={{ color: '#4A4A4A', fontFamily: "'Outfit', sans-serif" }}>
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Body */}
          <div className="legal-content">
            {children}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className="px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(204,255,0,0.06)' }}
      >
        <p className="text-xs" style={{ color: '#2A2A2A', fontFamily: "'Outfit', sans-serif" }}>
          © {new Date().getFullYear()} Sniper Cutzz · All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <Link href="/privacy-policy" className="transition-colors hover:text-[#CCFF00]" style={{ color: '#2A2A2A' }}>
            Privacy Policy
          </Link>
          <Link href="/legal-notice" className="transition-colors hover:text-[#CCFF00]" style={{ color: '#2A2A2A' }}>
            Legal Notice
          </Link>
        </div>
      </footer>

      <style>{`
        .legal-content h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          letter-spacing: 0.06em;
          color: #CCFF00;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
        }
        .legal-content h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #F2F2F2;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .legal-content p {
          font-family: 'Outfit', sans-serif;
          font-size: 0.925rem;
          line-height: 1.8;
          color: #888888;
          margin-bottom: 1rem;
        }
        .legal-content ul {
          list-style: none;
          padding: 0;
          margin-bottom: 1rem;
        }
        .legal-content ul li {
          font-family: 'Outfit', sans-serif;
          font-size: 0.925rem;
          line-height: 1.8;
          color: #888888;
          padding-left: 1.25rem;
          position: relative;
          margin-bottom: 0.375rem;
        }
        .legal-content ul li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: rgba(204,255,0,0.5);
        }
        .legal-content a {
          color: #CCFF00;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .legal-content a:hover { opacity: 0.7; }
        .legal-content strong { color: #F2F2F2; font-weight: 600; }
        .legal-content .placeholder {
          display: inline-block;
          background: rgba(204,255,0,0.1);
          border: 1px dashed rgba(204,255,0,0.4);
          border-radius: 4px;
          padding: 1px 6px;
          font-size: 0.8rem;
          color: #CCFF00;
          font-family: monospace;
        }
        .legal-content .notice-box {
          border: 1px solid rgba(204,255,0,0.2);
          background: rgba(204,255,0,0.04);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
        }
        .legal-content .notice-box p { margin-bottom: 0; color: #888; }
      `}</style>
    </div>
  );
}
