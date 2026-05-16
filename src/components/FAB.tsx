'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';

export default function FAB({ onClick }: { onClick: () => void }) {
  const { t } = useApp();

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider shadow-2xl"
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: '#CCFF00',
        color: '#111111',
        boxShadow: '0 0 30px rgba(204,255,0,0.35), 0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Scissors icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
      {t.nav.book}
    </motion.button>
  );
}
