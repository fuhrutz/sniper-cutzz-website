'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import { useApp } from '@/lib/context';

const CALENDLY_URL = 'https://calendly.com/sniper-cutzz/haircut';

const BARBERS = {
  lux: ['Sniper', 'Luís', 'Tiago'],
  pt: ['Miguel', 'Pedro', 'André'],
};

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

type DayState = 'available' | 'off' | 'full' | 'past';
type BookingMode = 'whatsapp' | 'calendly';

function getDayState(year: number, month: number, day: number): DayState {
  const today = new Date();
  const d = new Date(year, month, day);
  if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return 'past';
  const dow = d.getDay();
  if (dow === 0) return 'off';
  if (day % 7 === 3) return 'full';
  return 'available';
}

function Calendar({
  value,
  onChange,
  t,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
  t: ReturnType<typeof useApp>['t'];
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const days: (number | null)[] = [
    ...Array(firstDay === 0 ? 6 : firstDay - 1).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          aria-label="Previous month"
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[rgba(204,255,0,0.1)]"
          style={{ color: 'var(--fg)' }}
        >
          ‹
        </button>
        <span className="text-sm font-semibold capitalize" style={{ color: 'var(--fg)', fontFamily: "'Outfit', sans-serif" }}>
          {monthName}
        </span>
        <button
          onClick={nextMonth}
          aria-label="Next month"
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[rgba(204,255,0,0.1)]"
          style={{ color: 'var(--fg)' }}
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={i} className="text-center text-xs font-semibold uppercase" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const state = getDayState(viewYear, viewMonth, day);
          const isSelected =
            value &&
            value.getFullYear() === viewYear &&
            value.getMonth() === viewMonth &&
            value.getDate() === day;
          const isToday =
            today.getFullYear() === viewYear &&
            today.getMonth() === viewMonth &&
            today.getDate() === day;

          return (
            <button
              key={day}
              disabled={state === 'past' || state === 'off' || state === 'full'}
              onClick={() => onChange(new Date(viewYear, viewMonth, day))}
              aria-label={`${day} ${monthName}`}
              aria-pressed={!!isSelected}
              className={`h-9 rounded-lg text-xs font-semibold transition-all duration-150 ${
                isSelected ? 'day-selected' : state === 'past' ? 'day-past' : `day-${state}`
              } ${isToday && !isSelected ? 'day-today' : ''}`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {[
          { cls: 'day-available', label: t.booking.available },
          { cls: 'day-off', label: t.booking.off },
          { cls: 'day-full', label: t.booking.full },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${item.cls}`} />
            <span className="text-xs" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Calendly panel ────────────────────────────────────────────────────────
function CalendlyPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 p-3 rounded-lg flex items-start gap-3"
        style={{ background: 'rgba(204,255,0,0.06)', border: '1px solid rgba(204,255,0,0.15)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2" className="flex-shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
          Pick a slot and receive instant confirmation by email. No WhatsApp needed.
        </p>
      </div>
      <div className="flex-1 rounded-xl overflow-hidden" style={{ minHeight: 580, border: '1px solid var(--border)' }}>
        <InlineWidget
          url={CALENDLY_URL}
          styles={{ height: '100%', minHeight: 580 }}
          pageSettings={{
            backgroundColor: '1A1A1A',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: 'CCFF00',
            textColor: 'F2F2F2',
          }}
        />
      </div>
    </div>
  );
}

// ── WhatsApp panel ────────────────────────────────────────────────────────
function WhatsAppPanel({ onClose }: { onClose: () => void }) {
  const { t } = useApp();
  const [location, setLocation] = useState<'lux' | 'pt'>('lux');
  const [barber, setBarber] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');


  const canConfirm = barber && date && time && name.trim() && whatsapp.trim();

  const handleConfirm = () => {
    if (!canConfirm) return;
    const dateStr = date!.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const locationLabel = location === 'lux' ? 'Luxembourg' : 'Portugal';
    const msg = encodeURIComponent(
      `Hello Sniper Cutzz! 🔫✂️\n\n` +
      `I'd like to book an appointment:\n\n` +
      `👤 Name: ${name}\n` +
      `📍 Location: ${locationLabel}\n` +
      `💈 Barber: ${barber}\n` +
      `📅 Date: ${dateStr}\n` +
      `🕐 Time: ${time}\n\n` +
      `Please confirm my booking. Thank you!`
    );
    window.open(`https://wa.me/352691341915?text=${msg}`, '_blank');
    onClose();
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left column */}
      <div className="flex flex-col gap-6">
        {/* Location */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}>
            {t.booking.location}
          </label>
          <div className="flex gap-2">
            {(['lux', 'pt'] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => { setLocation(loc); setBarber(''); }}
                className="flex-1 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-250 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: location === loc ? '#CCFF00' : 'var(--bg)',
                  color: location === loc ? '#111111' : 'var(--muted)',
                  border: location === loc ? 'none' : '1px solid var(--border)',
                }}
              >
                {loc === 'lux' ? '🇱🇺 Luxembourg' : '🇵🇹 Portugal'}
              </button>
            ))}
          </div>
        </div>

        {/* Barber */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}>
            {t.booking.barber}
          </label>
          <div className="flex flex-col gap-2">
            {BARBERS[location].map((b) => (
              <button
                key={b}
                onClick={() => setBarber(b)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: barber === b ? 'rgba(204,255,0,0.12)' : 'var(--bg)',
                  border: barber === b ? '1px solid rgba(204,255,0,0.4)' : '1px solid var(--border)',
                  color: barber === b ? '#CCFF00' : 'var(--fg)',
                }}
                aria-pressed={barber === b}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: barber === b ? 'rgba(204,255,0,0.2)' : 'var(--border)',
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: barber === b ? '#CCFF00' : 'var(--muted)',
                  }}
                >
                  {b[0]}
                </div>
                <span className="text-sm font-semibold">{b}</span>
                {barber === b && (
                  <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Name & WhatsApp */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}>
              {t.booking.name}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors focus-visible:outline-2 focus-visible:outline-[#CCFF00]"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontFamily: "'Outfit', sans-serif" }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(204,255,0,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}>
              {t.booking.whatsapp}
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+352 XXX XXX XXX"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontFamily: "'Outfit', sans-serif" }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(204,255,0,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}>
            {t.booking.date}
          </label>
          <Calendar value={date} onChange={setDate} t={t} />
        </div>

        <AnimatePresence>
          {date && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <label className="block text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}>
                {t.booking.time}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    aria-pressed={time === slot}
                    className="py-2 rounded-lg text-xs font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-1"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      background: time === slot ? '#CCFF00' : 'var(--bg)',
                      color: time === slot ? '#111111' : 'var(--muted)',
                      border: time === slot ? 'none' : '1px solid var(--border)',
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirm button — spans full width */}
      <div className="md:col-span-2 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
        <motion.button
          whileHover={canConfirm ? { scale: 1.02, boxShadow: '0 0 40px rgba(204,255,0,0.35)' } : {}}
          whileTap={canConfirm ? { scale: 0.98 } : {}}
          onClick={handleConfirm}
          disabled={!canConfirm}
          aria-disabled={!canConfirm}
          className="w-full py-4 font-semibold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
          style={{
            fontFamily: "'Outfit', sans-serif",
            background: canConfirm ? '#CCFF00' : 'var(--border)',
            color: canConfirm ? '#111111' : 'var(--muted)',
            cursor: canConfirm ? 'pointer' : 'not-allowed',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={canConfirm ? '#111111' : 'var(--muted)'} aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t.booking.confirm}
        </motion.button>
      </div>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────
export default function BookingModal({ onClose }: { onClose: () => void }) {
  const { t } = useApp();
  const [mode, setMode] = useState<BookingMode>('whatsapp');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="w-full max-w-3xl rounded-2xl relative my-8"
        style={{ background: 'var(--card)', border: '1px solid rgba(204,255,0,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h2
              className="font-heading text-3xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em', color: 'var(--fg)' }}
            >
              {t.booking.title}
            </h2>
            {/* Mode toggle */}
            <div className="flex items-center gap-1 mt-3 p-1 rounded-lg w-fit" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <button
                onClick={() => setMode('whatsapp')}
                aria-pressed={mode === 'whatsapp'}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#CCFF00]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: mode === 'whatsapp' ? '#CCFF00' : 'transparent',
                  color: mode === 'whatsapp' ? '#111111' : 'var(--muted)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Quick Book
              </button>
              <button
                onClick={() => setMode('calendly')}
                aria-pressed={mode === 'calendly'}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#CCFF00]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: mode === 'calendly' ? '#CCFF00' : 'transparent',
                  color: mode === 'calendly' ? '#111111' : 'var(--muted)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Schedule Online
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-colors hover:bg-[rgba(255,255,255,0.05)] focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
            style={{ color: 'var(--muted)' }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {mode === 'whatsapp' ? (
              <motion.div
                key="whatsapp"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <WhatsAppPanel onClose={onClose} />
              </motion.div>
            ) : (
              <motion.div
                key="calendly"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <CalendlyPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
