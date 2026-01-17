// Конфигурация интернационализации

export const defaultLocale = 'ru' as const;
export const locales = ['ru', 'en', 'tr', 'uk'] as const;

export type Locale = typeof locales[number];

