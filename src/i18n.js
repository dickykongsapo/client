import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import './assets/locale/locale.constant-zh_TW.json'
import translate_en from '@assets/locale/locale.constant-en_US.json';
import translate_zh from '@assets/locale/locale.constant-zh_TW.json';

const resources = {
    en_US: {
        translation: translate_en
    },
    zh_TW: {
        translation: translate_zh
    }
}

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en_US",
        lng: "en_US",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;