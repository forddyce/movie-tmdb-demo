import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import id from "./locales/id.json";

const LANGUAGE_STORAGE_KEY = "worlder_language";

const getLanguageFromStorage = (): string => {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";
};

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        id: { translation: id },
    },
    lng: getLanguageFromStorage(),
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

i18n.on("languageChanged", (lng) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
});

export default i18n;
