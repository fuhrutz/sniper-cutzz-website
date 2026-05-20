'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/context';

const sampleReviews = [
  {
    id: 1,
    name: 'Marco A.',
    stars: 5,
    text: 'Best fade I\'ve ever had. Sniper is an artist. Every detail was perfect, from the edge-up to the hot towel finish. Worth every cent.',
    date: 'March 2025',
    location: 'Luxembourg',
    initials: 'MA',
  },
  {
    id: 2,
    name: 'João F.',
    stars: 5,
    text: 'Incrível! O Luís fez um trabalho espectacular na minha barba. Saí com um look completamente diferente. O melhor barbeiro em Luxemburgo!',
    date: 'April 2025',
    location: 'Luxembourg',
    initials: 'JF',
  },
  {
    id: 3,
    name: 'Pierre M.',
    stars: 5,
    text: 'Excellente expérience du début à la fin. L\'ambiance est top, les barbiers sont professionnels et le résultat est impeccable. Je recommande à 100%.',
    date: 'April 2025',
    location: 'Luxembourg',
    initials: 'PM',
  },
  {
    id: 4,
    name: 'Tomas R.',
    stars: 5,
    text: 'Unglaublich! Habe noch nie einen so präzisen Fade bekommen. Das Team ist super professionell und die Atmosphäre ist einzigartig.',
    date: 'March 2025',
    location: 'Luxembourg',
    initials: 'TR',
  },
  {
    id: 5,
    name: 'Ricardo S.',
    stars: 5,
    text: 'Os miúdos de Portugal são top! Preços imbatíveis e qualidade de luxo. O Miguel é um maestro com a tesoura.',
    date: 'February 2025',
    location: 'Portugal',
    initials: 'RS',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= count ? '#CCFF00' : 'transparent'}
          stroke="#CCFF00"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function ReviewModal({ onClose }: { onClose: () => void }) {
  const { t } = useApp();
  const [stars, setStars] = useState(5);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md rounded-2xl p-8 relative"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close review form"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
          style={{ background: 'var(--border)', color: 'var(--muted)' }}
        >
          <span aria-hidden="true">✕</span>
        </button>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 py-8 text-center"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ background: 'rgba(204,255,0,0.15)' }}>
              ✓
            </div>
            <p className="font-heading text-2xl" style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#CCFF00', letterSpacing: '0.06em' }}>
              Review Submitted!
            </p>
            <p className="text-sm" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
              Thank you for sharing your experience.
            </p>
          </motion.div>
        ) : (
          <>
            <h3
              id="review-modal-title"
              className="font-heading text-2xl mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em', color: 'var(--fg)' }}
            >
              {t.reviews.modal_title}
            </h3>

            {/* Star selector */}
            <div className="flex gap-2 mb-6" role="group" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onClick={() => setStars(i)}
                  aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
                  aria-pressed={i <= stars}
                  className="transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2 rounded"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24"
                    fill={i <= stars ? '#CCFF00' : 'transparent'}
                    stroke="#CCFF00" strokeWidth="2" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder={t.reviews.modal_name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-3 rounded-lg text-sm outline-none focus:border-[#CCFF00] transition-colors"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--fg)',
                  fontFamily: "'Outfit', sans-serif",
                }}
              />
              <textarea
                placeholder={t.reviews.modal_comment}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                className="px-4 py-3 rounded-lg text-sm outline-none focus:border-[#CCFF00] transition-colors resize-none"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--fg)',
                  fontFamily: "'Outfit', sans-serif",
                }}
              />

              {/* File upload */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label={fileName ? `Selected file: ${fileName}. Click to change` : 'Upload a photo or video of your haircut'}
                className="px-4 py-3 rounded-lg text-sm text-left transition-colors flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
                style={{
                  background: 'var(--bg)',
                  border: '1px dashed var(--border)',
                  color: 'var(--muted)',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17,8 12,3 7,8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {fileName || t.reviews.modal_photo}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-colors"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                  }}
                >
                  {t.reviews.modal_cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all hover:scale-105"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: '#CCFF00',
                    color: '#111111',
                  }}
                >
                  {t.reviews.modal_submit}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Reviews() {
  const { t } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="reviews"
      className="section-padding relative"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Testimonials
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
            {t.reviews.title}
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
            {t.reviews.subtitle}
          </p>

          {/* Add Review Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm uppercase tracking-wider rounded-lg transition-all"
            style={{
              fontFamily: "'Outfit', sans-serif",
              background: 'transparent',
              border: '1px solid rgba(204,255,0,0.35)',
              color: '#CCFF00',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {t.reviews.add_btn}
          </motion.button>
        </motion.div>

        {/* Reviews Marquee-style scroll */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -4,
                borderColor: 'rgba(204,255,0,0.3)',
              }}
              className="p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Stars */}
              <Stars count={review.stars} />

              {/* Quote */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'var(--fg)', fontFamily: "'Outfit', sans-serif", fontStyle: 'italic' }}
              >
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(204,255,0,0.12)', color: '#CCFF00', fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.9rem' }}
                >
                  {review.initials}
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--fg)', fontFamily: "'Outfit', sans-serif" }}
                  >
                    {review.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}
                  >
                    {review.location} · {review.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && <ReviewModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
