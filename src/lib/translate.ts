/**
 * Утиліта для автоматичного перекладу тексту
 * Використовує безкоштовний API перекладу
 */

type LanguageCode = 'ru' | 'en' | 'tr' | 'uk';

interface TranslateOptions {
  from: LanguageCode;
  to: LanguageCode;
  text: string;
}

/**
 * Мапить коди мов для різних API
 */
function getLanguageCode(lang: LanguageCode, api: 'libretranslate' | 'mymemory' = 'libretranslate'): string {
  const map: Record<LanguageCode, { libretranslate: string; mymemory: string }> = {
    ru: { libretranslate: 'ru', mymemory: 'ru' },
    en: { libretranslate: 'en', mymemory: 'en' },
    tr: { libretranslate: 'tr', mymemory: 'tr' },
    uk: { libretranslate: 'uk', mymemory: 'uk' },
  };
  return map[lang][api];
}

/**
 * Перекладає текст з однієї мови на іншу
 * Використовує безкоштовний API перекладу з fallback
 */
export async function translateText(options: TranslateOptions): Promise<string> {
  const { from, to, text } = options;

  if (!text || text.trim().length === 0) {
    return '';
  }

  // Якщо мови однакові, повертаємо оригінал
  if (from === to) {
    return text;
  }

  // Спроба 1: LibreTranslate
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: getLanguageCode(from, 'libretranslate'),
        target: getLanguageCode(to, 'libretranslate'),
        format: 'text',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.translatedText) {
        return data.translatedText;
      }
    }
  } catch (error) {
    console.warn('LibreTranslate failed, trying fallback:', error);
  }

  // Спроба 2: MyMemory Translation API (fallback)
  try {
    const sourceLang = getLanguageCode(from, 'mymemory');
    const targetLang = getLanguageCode(to, 'mymemory');
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`,
      {
        method: 'GET',
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (error) {
    console.warn('MyMemory Translation failed:', error);
  }

  // Якщо всі спроби не вдалися, повертаємо оригінал
  console.error(`Failed to translate text from ${from} to ${to}`);
  return text;
}

/**
 * Перекладає об'єкт з перекладами, додаючи відсутні мови
 */
export async function translateObject<T extends Record<string, string>>(
  obj: T,
  sourceLanguage: LanguageCode = 'en'
): Promise<Record<LanguageCode, string>> {
  const languages: LanguageCode[] = ['ru', 'en', 'tr', 'uk'];
  const result: Partial<Record<LanguageCode, string>> = {};

  // Копіюємо існуючі переклади
  for (const lang of languages) {
    if (obj[lang]) {
      result[lang] = obj[lang];
    }
  }

  // Перекладаємо відсутні мови
  for (const lang of languages) {
    if (!result[lang]) {
      const sourceText = obj[sourceLanguage] || obj.ru || obj.en || '';
      if (sourceText) {
        result[lang] = await translateText({
          from: sourceLanguage,
          to: lang,
          text: sourceText,
        });
      }
    }
  }

  return result as Record<LanguageCode, string>;
}

/**
 * Перекладає масив об'єктів з перекладами
 */
export async function translateArray<T extends Record<string, string>>(
  items: T[],
  sourceLanguage: LanguageCode = 'en'
): Promise<Record<LanguageCode, string>[]> {
  return Promise.all(items.map((item) => translateObject(item, sourceLanguage)));
}
