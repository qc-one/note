import {
    createI18n
} from "vue-i18n";
import zh from './zh';
import en from './en';
const i18n = createI18n({
    legacy: false,
    locale: "zh", // 初始化配置语言
    messages: {
        zh,
        en,
    },
});

module.exports = i18n;