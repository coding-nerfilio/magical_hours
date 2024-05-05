import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nBackend from "i18next-http-backend";
i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    lng: "es",
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: import.meta.env.VITE_API_URL + "v1/languages/{{lng}}",
    },
  });

export default i18n;
