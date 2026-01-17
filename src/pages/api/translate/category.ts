import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { getEventCategoryById, updateEventCategory } from '@/lib/db';
import { translateText } from '@/lib/translate';

export const config = {
  api: {
    responseLimit: false,
  },
};

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { categoryId, languages } = req.body;

    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const category = getEventCategoryById.get(parseInt(categoryId, 10)) as any;

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const languagesToTranslate = languages || ['tr', 'uk'];
    const translations: Record<string, string> = {};

    // Перекладаємо title
    if (languagesToTranslate.includes('tr') && !category.title_tr) {
      translations.title_tr = await translateText({
        from: 'en',
        to: 'tr',
        text: category.title_en || category.title_ru,
      });
    }
    if (languagesToTranslate.includes('uk') && !category.title_uk) {
      translations.title_uk = await translateText({
        from: 'ru',
        to: 'uk',
        text: category.title_ru || category.title_en,
      });
    }

    // Перекладаємо description
    if (languagesToTranslate.includes('tr') && !category.description_tr) {
      translations.description_tr = await translateText({
        from: 'en',
        to: 'tr',
        text: category.description_en || category.description_ru,
      });
    }
    if (languagesToTranslate.includes('uk') && !category.description_uk) {
      translations.description_uk = await translateText({
        from: 'ru',
        to: 'uk',
        text: category.description_ru || category.description_en,
      });
    }

    // Перекладаємо subcategories
    let subcategories = category.subcategories;
    if (subcategories) {
      try {
        const parsedSubcategories = JSON.parse(subcategories);
        if (Array.isArray(parsedSubcategories)) {
          const translatedSubcategories = await Promise.all(
            parsedSubcategories.map(async (subcat: any) => {
              const translated: any = { ...subcat };

              if (languagesToTranslate.includes('tr')) {
                if (!subcat.tr) {
                  translated.tr = await translateText({
                    from: 'en',
                    to: 'tr',
                    text: subcat.en || subcat.ru,
                  });
                } else {
                  translated.tr = subcat.tr;
                }
              }

              if (languagesToTranslate.includes('uk')) {
                if (!subcat.uk) {
                  translated.uk = await translateText({
                    from: 'ru',
                    to: 'uk',
                    text: subcat.ru || subcat.en,
                  });
                } else {
                  translated.uk = subcat.uk;
                }
              }

              // Перекладаємо description підкатегорії, якщо воно є
              if (subcat.description) {
                if (!translated.description) {
                  translated.description = {};
                }
                if (languagesToTranslate.includes('tr') && !subcat.description.tr) {
                  translated.description.tr = await translateText({
                    from: 'en',
                    to: 'tr',
                    text: subcat.description.en || subcat.description.ru || '',
                  });
                }
                if (languagesToTranslate.includes('uk') && !subcat.description.uk) {
                  translated.description.uk = await translateText({
                    from: 'ru',
                    to: 'uk',
                    text: subcat.description.ru || subcat.description.en || '',
                  });
                }
              }

              return translated;
            })
          );
          translations.subcategories = JSON.stringify(translatedSubcategories);
        }
      } catch (e) {
        console.error('Error parsing subcategories:', e);
      }
    }

    // Оновлюємо переклади категорії
    if (Object.keys(translations).length > 0) {
      const { updateEventCategoryTranslations } = await import('@/lib/db');
      updateEventCategoryTranslations.run(
        translations.title_tr || null,
        translations.title_uk || null,
        translations.description_tr || null,
        translations.description_uk || null,
        translations.subcategories || null,
        parseInt(categoryId, 10)
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Translations generated successfully',
      translations,
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    return res.status(500).json({
      error: 'Failed to translate category',
      message: error.message,
    });
  }
}

export default requireAuth(handler);
