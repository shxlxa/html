const localeMap = {
    zh: "zh-Hans",
    de: "de",
    es: "es",
    pt: "pt",
    ja: "ja",
    ru: "ru",
    en: "en"
};

const translations = {
    en: {
        navPrivacy: "Privacy",
        navSupport: "Support",
        privacyHeroTitle: "Privacy, without fine print.",
        privacyHeroSummary: "Your timer runs on your Mac. FTTimer does not collect, transmit, sell, or share personal data.",
        noCollectionTitle: "No collection",
        noCollectionBody: "No personal or usage data leaves your device.",
        noTrackingTitle: "No tracking",
        noTrackingBody: "No advertising, analytics, or tracking technologies.",
        localSettingsTitle: "Local settings",
        localSettingsBody: "Work and break durations are stored only on your Mac.",
        supportHeroTitle: "Support, kept simple.",
        supportHeroSummary: "Setup guidance, notification troubleshooting, and a direct path to the developer."
    },
    "zh-Hans": {
        navPrivacy: "隐私政策",
        navSupport: "获取支持",
        privacyHeroTitle: "隐私，清楚说明。",
        privacyHeroSummary: "计时完全在你的 Mac 上运行。FTTimer 不收集、传输、出售或共享个人数据。",
        noCollectionTitle: "不收集数据",
        noCollectionBody: "个人信息和使用数据不会离开你的设备。",
        noTrackingTitle: "不跟踪用户",
        noTrackingBody: "没有广告、分析统计或跟踪技术。",
        localSettingsTitle: "设置保存在本机",
        localSettingsBody: "工作和休息时长只保存在你的 Mac 上。",
        supportHeroTitle: "支持，简单直接。",
        supportHeroSummary: "查看使用说明、通知排查方法，并联系开发者。"
    },
    de: {
        navPrivacy: "Datenschutz",
        navSupport: "Support",
        privacyHeroTitle: "Datenschutz, klar erklärt.",
        privacyHeroSummary: "Der Timer läuft auf deinem Mac. FTTimer erfasst, überträgt, verkauft oder teilt keine personenbezogenen Daten.",
        noCollectionTitle: "Keine Datenerfassung",
        noCollectionBody: "Keine persönlichen oder Nutzungsdaten verlassen dein Gerät.",
        noTrackingTitle: "Kein Tracking",
        noTrackingBody: "Keine Werbung, Analyse oder Tracking-Technologien.",
        localSettingsTitle: "Lokale Einstellungen",
        localSettingsBody: "Arbeits- und Pausenzeiten bleiben auf deinem Mac.",
        supportHeroTitle: "Support, einfach gehalten.",
        supportHeroSummary: "Hinweise zur Einrichtung, Hilfe bei Mitteilungen und Kontakt zum Entwickler."
    },
    es: {
        navPrivacy: "Privacidad",
        navSupport: "Soporte",
        privacyHeroTitle: "Privacidad, sin letra pequeña.",
        privacyHeroSummary: "El temporizador funciona en tu Mac. FTTimer no recopila, transmite, vende ni comparte datos personales.",
        noCollectionTitle: "Sin recopilación",
        noCollectionBody: "Ningún dato personal o de uso sale del dispositivo.",
        noTrackingTitle: "Sin seguimiento",
        noTrackingBody: "Sin publicidad, análisis ni tecnologías de seguimiento.",
        localSettingsTitle: "Ajustes locales",
        localSettingsBody: "Las duraciones se guardan únicamente en tu Mac.",
        supportHeroTitle: "Soporte claro y sencillo.",
        supportHeroSummary: "Guía de uso, solución de notificaciones y contacto con el desarrollador."
    },
    pt: {
        navPrivacy: "Privacidade",
        navSupport: "Suporte",
        privacyHeroTitle: "Privacidade, sem letras miúdas.",
        privacyHeroSummary: "O timer funciona no seu Mac. FTTimer não coleta, transmite, vende nem compartilha dados pessoais.",
        noCollectionTitle: "Sem coleta",
        noCollectionBody: "Nenhum dado pessoal ou de uso sai do dispositivo.",
        noTrackingTitle: "Sem rastreamento",
        noTrackingBody: "Sem anúncios, análises ou tecnologias de rastreamento.",
        localSettingsTitle: "Ajustes locais",
        localSettingsBody: "As durações ficam armazenadas apenas no seu Mac.",
        supportHeroTitle: "Suporte, simples assim.",
        supportHeroSummary: "Orientações de uso, solução de notificações e contato com o desenvolvedor."
    },
    ja: {
        navPrivacy: "プライバシー",
        navSupport: "サポート",
        privacyHeroTitle: "わかりやすいプライバシー。",
        privacyHeroSummary: "タイマーは Mac 上で動作します。FTTimer は個人データを収集、送信、販売、共有しません。",
        noCollectionTitle: "データ収集なし",
        noCollectionBody: "個人データや利用データがデバイス外へ送られることはありません。",
        noTrackingTitle: "トラッキングなし",
        noTrackingBody: "広告、分析、トラッキング技術はありません。",
        localSettingsTitle: "ローカル設定",
        localSettingsBody: "作業時間と休憩時間は Mac 内にのみ保存されます。",
        supportHeroTitle: "シンプルなサポート。",
        supportHeroSummary: "使い方、通知のトラブル解決、開発者への連絡方法をご案内します。"
    },
    ru: {
        navPrivacy: "Конфиденциальность",
        navSupport: "Поддержка",
        privacyHeroTitle: "Конфиденциальность без мелкого шрифта.",
        privacyHeroSummary: "Таймер работает на вашем Mac. FTTimer не собирает, не передаёт, не продаёт и не раскрывает персональные данные.",
        noCollectionTitle: "Без сбора данных",
        noCollectionBody: "Личные данные и сведения об использовании не покидают устройство.",
        noTrackingTitle: "Без отслеживания",
        noTrackingBody: "Без рекламы, аналитики и технологий отслеживания.",
        localSettingsTitle: "Локальные настройки",
        localSettingsBody: "Время работы и перерыва хранится только на Mac.",
        supportHeroTitle: "Простая поддержка.",
        supportHeroSummary: "Инструкции, решение проблем с уведомлениями и связь с разработчиком."
    }
};

function preferredLocale() {
    const savedLocale = localStorage.getItem("fttimer-locale");
    if (savedLocale) {
        return savedLocale;
    }

    const browserLanguage = (navigator.language || "en").toLowerCase();
    const languageCode = browserLanguage.split("-")[0];
    return localeMap[languageCode] || "en";
}

function applyLocale(locale) {
    const supportedLocale = Object.values(localeMap).includes(locale) ? locale : "en";
    document.documentElement.lang = supportedLocale;
    localStorage.setItem("fttimer-locale", supportedLocale);

    document.querySelectorAll("[data-locale-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.localePanel !== supportedLocale;
    });

    document.querySelectorAll("[data-language-picker]").forEach((picker) => {
        picker.value = supportedLocale;
    });

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const translatedValue = translations[supportedLocale][element.dataset.i18n];
        if (translatedValue) {
            element.textContent = translatedValue;
        }
    });

    const activePanel = document.querySelector(`[data-locale-panel="${supportedLocale}"]`);
    if (activePanel?.dataset.pageTitle) {
        document.title = activePanel.dataset.pageTitle;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    applyLocale(preferredLocale());

    document.querySelectorAll("[data-language-picker]").forEach((picker) => {
        picker.addEventListener("change", (event) => applyLocale(event.target.value));
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
});
