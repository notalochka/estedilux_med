// Конфігурація інтернаціоналізації

export const defaultLocale = 'uk' as const;
export const locales = ['uk', 'en'] as const;

export type Locale = typeof locales[number];

