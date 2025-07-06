import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language files
import fi from './locales/fi.json';
import en from './locales/en.json';
import sv from './locales/sv.json';

const resources = {
  fi: {
    translation: fi
  },
  en: {
    translation: en
  },
  sv: {
    translation: sv
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fi',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'browserLanguage', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    }
  });

export default i18n; 