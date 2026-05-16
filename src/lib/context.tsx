'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lang, translations, Translations } from './translations';

interface AppContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  isDark: boolean;
  toggleTheme: () => void;
  bookingOpen: boolean;
  setBookingOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [isDark, setIsDark] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const t = translations[lang] as unknown as Translations;

  return (
    <AppContext.Provider value={{ lang, setLang, t, isDark, toggleTheme, bookingOpen, setBookingOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
