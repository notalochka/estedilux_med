import type { Locale } from '@/config/i18n';

type TranslationMap = {
  ru: string;
  en: string;
  tr: string;
  uk: string;
};

/**
 * Получает перевод для указанной локали
 * @param translations - Объект с переводами для всех языков
 * @param locale - Текущая локаль
 * @param fallback - Язык по умолчанию, если перевод не найден (по умолчанию 'ru')
 * @returns Переведенный текст
 */
export function t(translations: TranslationMap, locale?: string | Locale, fallback: Locale = 'ru'): string {
  const currentLocale = (locale || fallback) as Locale;
  
  // Проверяем, есть ли перевод для текущей локали
  if (translations[currentLocale]) {
    return translations[currentLocale];
  }
  
  // Если перевода нет, используем fallback
  return translations[fallback] || translations.ru || '';
}

/**
 * Создает функцию перевода для конкретной локали
 * @param locale - Локаль
 * @returns Функция для получения переводов
 */
export function createTranslator(locale?: string | Locale) {
  return (translations: TranslationMap) => t(translations, locale);
}
