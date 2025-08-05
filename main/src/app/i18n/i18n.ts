// src/app/i18n/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '../locales/en/translation.json';
import translationFR from '../locales/fr/translation.json';
import translationDE from '../locales/de/translation.json';

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  de: { translation: translationDE },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      // options for language detection
      // For example:
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // Add this line if you're not using Suspense
    },
  });

export default i18n;
