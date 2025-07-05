import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationFI from './locales/fi/translation.json';
import translationEN from './locales/en/translation.json';
import translationSV from './locales/sv/translation.json';

const resources = {
  fi: {
    translation: translationFI
  },
  en: {
    translation: translationEN
  },
  sv: {
    translation: translationSV
  }
};

// Get saved language from localStorage or default to Finnish
const savedLanguage = localStorage.getItem('i18nextLng') || 'fi';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Use saved language or default to Finnish
    fallbackLng: 'fi', // Fallback language: Finnish
    
    keySeparator: false, // We do not use keys in form messages.welcome
    
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n; 