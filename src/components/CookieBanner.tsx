'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCookie, setCookie } from 'cookies-next';
import { useApp } from '@/lib/context';

const CONSENT_KEY = 'sniper-cookie-consent-v1';

type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const COOKIE_OPTS = { maxAge: 60 * 60 * 24 * 365, path: '/' } as const;

const BANNER_COPY = {
  en: {
    title: 'We use cookies',
    body: 'We use cookies to improve your experience and for booking analytics. You control what we store.',
    accept: 'Accept all',
    customize: 'Customize',
    essential: 'Essential only',
    modal_title: 'Cookie Preferences',
    save: 'Save preferences',
    cat_essential: 'Essential',
    cat_essential_desc: 'Required for the site to work. Cannot be disabled.',
    cat_analytics: 'Analytics',
    cat_analytics_desc: 'Helps us understand how visitors use the site (anonymised).',
    cat_marketing: 'Marketing',
    cat_marketing_desc: 'Used for targeted ads and social media (Instagram, Meta).',
    cat_preferences: 'Preferences',
    cat_preferences_desc: 'Remembers your language and theme settings.',
  },
  pt: {
    title: 'Usamos cookies',
    body: 'Usamos cookies para melhorar a experiência e para análises de agendamento. Tu controlas o que guardamos.',
    accept: 'Aceitar tudo',
    customize: 'Personalizar',
    essential: 'Só essenciais',
    modal_title: 'Preferências de Cookies',
    save: 'Guardar preferências',
    cat_essential: 'Essenciais',
    cat_essential_desc: 'Necessários para o funcionamento do site. Não podem ser desativados.',
    cat_analytics: 'Análise',
    cat_analytics_desc: 'Ajuda-nos a perceber como os visitantes usam o site (anonimizado).',
    cat_marketing: 'Marketing',
    cat_marketing_desc: 'Usado para anúncios segmentados e redes sociais (Instagram, Meta).',
    cat_preferences: 'Preferências',
    cat_preferences_desc: 'Lembra o teu idioma e configurações de tema.',
  },
  fr: {
    title: 'Nous utilisons des cookies',
    body: 'Nous utilisons des cookies pour améliorer votre expérience et l\'analyse des réservations. Vous contrôlez ce que nous stockons.',
    accept: 'Tout accepter',
    customize: 'Personnaliser',
    essential: 'Essentiels uniquement',
    modal_title: 'Préférences de cookies',
    save: 'Enregistrer les préférences',
    cat_essential: 'Essentiels',
    cat_essential_desc: 'Nécessaires au fonctionnement du site. Ne peuvent être désactivés.',
    cat_analytics: 'Analyse',
    cat_analytics_desc: 'Nous aide à comprendre comment les visiteurs utilisent le site (anonymisé).',
    cat_marketing: 'Marketing',
    cat_marketing_desc: 'Utilisé pour des publicités ciblées et les réseaux sociaux (Instagram, Meta).',
    cat_preferences: 'Préférences',
    cat_preferences_desc: 'Mémorise votre langue et vos paramètres de thème.',
  },
  de: {
    title: 'Wir verwenden Cookies',
    body: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und Buchungsanalysen durchzuführen. Sie bestimmen, was wir speichern.',
    accept: 'Alle akzeptieren',
    customize: 'Anpassen',
    essential: 'Nur Notwendige',
    modal_title: 'Cookie-Einstellungen',
    save: 'Einstellungen speichern',
    cat_essential: 'Notwendig',
    cat_essential_desc: 'Für den Betrieb der Website erforderlich. Kann nicht deaktiviert werden.',
    cat_analytics: 'Analyse',
    cat_analytics_desc: 'Hilft uns zu verstehen, wie Besucher die Website nutzen (anonymisiert).',
    cat_marketing: 'Marketing',
    cat_marketing_desc: 'Für gezielte Werbung und soziale Medien (Instagram, Meta).',
    cat_preferences: 'Einstellungen',
    cat_preferences_desc: 'Speichert Ihre Sprach- und Theme-Einstellungen.',
  },
};

function saveConsent(consent: ConsentState) {
  setCookie(CONSENT_KEY, JSON.stringify(consent), COOKIE_OPTS);
}

function CustomizeModal({
  consent,
  onChange,
  onSave,
  onClose,
  copy,
}: {
  consent: ConsentState;
  onChange: (key: keyof Omit<ConsentState, 'essential'>, val: boolean) => void;
  onSave: () => void;
  onClose: () => void;
  copy: (typeof BANNER_COPY)['en'];
}) {
  const categories = [
    { key: 'essential' as const, label: copy.cat_essential, desc: copy.cat_essential_desc, disabled: true },
    { key: 'analytics' as const, label: copy.cat_analytics, desc: copy.cat_analytics_desc, disabled: false },
    { key: 'marketing' as const, label: copy.cat_marketing, desc: copy.cat_marketing_desc, disabled: false },
    { key: 'preferences' as const, label: copy.cat_preferences, desc: copy.cat_preferences_desc, disabled: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-md rounded-2xl p-6 relative"
        style={{ background: '#0E0E0E', border: '1px solid rgba(204,255,0,0.25)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={copy.modal_title}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#F2F2F2', letterSpacing: '0.06em' }}>
            {copy.modal_title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-2 focus-visible:outline-[#CCFF00]"
            style={{ color: '#4A4A4A' }}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: '#F2F2F2', fontFamily: "'Outfit', sans-serif" }}>
                    {cat.label}
                  </span>
                  {cat.disabled && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider"
                      style={{ background: 'rgba(204,255,0,0.1)', color: '#CCFF00', fontFamily: "'Outfit', sans-serif" }}>
                      Always on
                    </span>
                  )}
                </div>
                <p className="text-xs mt-1" style={{ color: '#4A4A4A', fontFamily: "'Outfit', sans-serif" }}>
                  {cat.desc}
                </p>
              </div>
              {/* Toggle */}
              <button
                role="switch"
                aria-checked={consent[cat.key]}
                disabled={cat.disabled}
                onClick={() => !cat.disabled && onChange(cat.key as keyof Omit<ConsentState, 'essential'>, !consent[cat.key])}
                className="flex-shrink-0 w-10 h-6 rounded-full transition-colors duration-200 relative focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
                style={{
                  background: consent[cat.key] ? '#CCFF00' : 'rgba(255,255,255,0.1)',
                  cursor: cat.disabled ? 'not-allowed' : 'pointer',
                  opacity: cat.disabled ? 0.6 : 1,
                }}
              >
                <span
                  className="absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-200"
                  style={{
                    background: '#111111',
                    transform: consent[cat.key] ? 'translateX(16px)' : 'translateX(0)',
                  }}
                />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onSave}
          className="w-full py-3 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
          style={{ background: '#CCFF00', color: '#111111', fontFamily: "'Outfit', sans-serif" }}
        >
          {copy.save}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function CookieBanner() {
  const { lang } = useApp();
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({ ...DEFAULT_CONSENT });

  const copy = BANNER_COPY[lang] ?? BANNER_COPY.en;

  useEffect(() => {
    const existing = getCookie(CONSENT_KEY);
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    const full: ConsentState = { essential: true, analytics: true, marketing: true, preferences: true };
    saveConsent(full);
    setVisible(false);
  }

  function essentialOnly() {
    saveConsent(DEFAULT_CONSENT);
    setVisible(false);
  }

  function handleCustomSave() {
    saveConsent(consent);
    setShowCustomize(false);
    setVisible(false);
  }

  function updateConsent(key: keyof Omit<ConsentState, 'essential'>, val: boolean) {
    setConsent((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <>
      <AnimatePresence>
        {visible && !showCustomize && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-4 right-4 z-50 w-full max-w-[420px] rounded-2xl p-5"
            style={{
              background: 'rgba(10,10,10,0.97)',
              border: '1px solid rgba(204,255,0,0.2)',
              backdropFilter: 'blur(16px)',
            }}
            role="region"
            aria-label="Cookie consent"
          >
            {/* Sniper crosshair accent */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(204,255,0,0.1)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#F2F2F2', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.08em', fontSize: '1rem' }}>
                  {copy.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: '#4A4A4A', fontFamily: "'Outfit', sans-serif" }}>
                  {copy.body}{' '}
                  <a href="/privacy-policy" className="underline hover:text-[#CCFF00] transition-colors" style={{ color: '#888' }}>
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={acceptAll}
                className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
                style={{ background: '#CCFF00', color: '#111111', fontFamily: "'Outfit', sans-serif" }}
              >
                {copy.accept}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCustomize(true)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all hover:border-[#CCFF00] hover:text-[#CCFF00] focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#888', fontFamily: "'Outfit', sans-serif", background: 'transparent' }}
                >
                  {copy.customize}
                </button>
                <button
                  onClick={essentialOnly}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all hover:text-[#CCFF00] focus-visible:outline-2 focus-visible:outline-[#CCFF00] focus-visible:outline-offset-2"
                  style={{ color: '#4A4A4A', fontFamily: "'Outfit', sans-serif", background: 'transparent' }}
                >
                  {copy.essential}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCustomize && (
          <CustomizeModal
            consent={consent}
            onChange={updateConsent}
            onSave={handleCustomSave}
            onClose={() => setShowCustomize(false)}
            copy={copy}
          />
        )}
      </AnimatePresence>
    </>
  );
}
