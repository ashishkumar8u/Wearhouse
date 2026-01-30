'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.locations': 'Locations',
    'nav.specifications': 'Specifications',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    // Header
    'header.callNow': 'Call Now',
    'header.language': 'ES',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.features': 'Características',
    'nav.locations': 'Ubicaciones',
    'nav.specifications': 'Especificaciones',
    'nav.gallery': 'Galería',
    'nav.contact': 'Contacto',
    // Header
    'header.callNow': 'Llama Ahora',
    'header.language': 'EN',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with 'en' to ensure server and client initial render match
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage after mount to prevent hydration mismatch
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

