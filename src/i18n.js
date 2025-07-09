import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationFI from './locales/fi.json';
import translationEN from './locales/en.json';
import translationSV from './locales/sv.json';

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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fi', // default language
    fallbackLng: 'fi',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    }
  });

export default i18n; 