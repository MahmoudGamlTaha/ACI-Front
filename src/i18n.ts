import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpBackend) // loads translation files
    .use(LanguageDetector) // detects user language
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false, // React already escapes
        },
        backend: {
            loadPath: '/locales/{{lng}}.json', // <-- updated path
        },
    });

export default i18n;
