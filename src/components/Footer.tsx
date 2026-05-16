'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';

export default function Footer({ onBookClick }: { onBookClick: () => void }) {
  const { t } = useApp();

  const navLinks = [
    { label: t.footer.nav_about,     href: '#about' },
    { label: t.footer.nav_services,  href: '#services' },
    { label: t.footer.nav_portfolio, href: '#portfolio' },
    { label: t.footer.nav_products,  href: '#products' },
    { label: t.footer.nav_reviews,   href: '#reviews' },
  ];

  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden"
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(204,255,0,0.08)' }}
    >
      {/* Background crosshair decoration */}
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-[0.03]">
        <svg width="500" height="400" viewBox="0 0 500 400" fill="none">
          <circle cx="400" cy="300" r="280" stroke="#CCFF00" strokeWidth="1" />
          <circle cx="400" cy="300" r="200" stroke="#CCFF00" strokeWidth="0.5" />
          <line x1="400" y1="0" x2="400" y2="600" stroke="#CCFF00" strokeWidth="0.5" />
          <line x1="100" y1="300" x2="700" y2="300" stroke="#CCFF00" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <span
                className="font-heading text-4xl tracking-widest"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#CCFF00', textShadow: '0 0 20px rgba(204,255,0,0.3)' }}
              >
                SNIPER
              </span>
              <span
                className="font-heading text-4xl tracking-widest ml-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#F2F2F2' }}
              >
                CUTZZ
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}
            >
              {t.footer.tagline}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/sniper_cutzz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#CCFF00]"
                style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                @sniper_cutzz
              </a>
              <a
                href="https://wa.me/352691341915"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#CCFF00]"
                style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Nav column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4
              className="font-heading text-lg mb-5 uppercase tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--fg)', letterSpacing: '0.1em' }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium transition-colors hover:text-[#CCFF00] flex items-center gap-2 group"
                    style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}
                  >
                    <span
                      className="w-4 h-px group-hover:w-6 transition-all duration-300"
                      style={{ background: '#CCFF00' }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Locations column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4
              className="font-heading text-lg mb-5 uppercase tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--fg)', letterSpacing: '0.1em' }}
            >
              Locations
            </h4>
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span>🇱🇺</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}
                  >
                    Luxembourg
                  </span>
                </div>
                <p className="text-xs leading-relaxed ml-6" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
                  Mon – Sat · 9:00 – 19:00<br />
                  WhatsApp: +352 691 341 915
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span>🇵🇹</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}
                  >
                    Portugal
                  </span>
                </div>
                <p className="text-xs leading-relaxed ml-6" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
                  Mon – Sat · 9:00 – 19:00<br />
                  WhatsApp: +352 691 341 915
                </p>
              </div>
            </div>

            {/* Book CTA */}
            <button
              onClick={onBookClick}
              className="mt-6 flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: 'rgba(204,255,0,0.1)',
                border: '1px solid rgba(204,255,0,0.25)',
                color: '#CCFF00',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2.5" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Appointment
            </button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
            © {new Date().getFullYear()} Sniper Cutzz · {t.footer.rights}
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)', fontFamily: "'Outfit', sans-serif" }}>
            {t.footer.made}{' '}
            <a
              href="#"
              className="font-semibold hover:text-[#CCFF00] transition-colors"
              style={{ color: '#CCFF00' }}
            >
              Vision2Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
