import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { getAllEventCategories } from '@/lib/db';
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
    const { languages } = req.body;
    const languagesToTranslate = languages || ['tr', 'uk'];

    const categories = getAllEventCategories.all() as any[];
    const db = (await import('@/lib/db')).default;

    let translatedCount = 0;
    const errors: string[] = [];

    for (const category of categories) {
      try {
        const updates: string[] = [];
        const values: any[] = [];

        // Перекладаємо title
        if (languagesToTranslate.includes('tr') && !category.title_tr) {
          try {
            const translated = await translateText({
              from: 'en',
              to: 'tr',
              text: category.title_en || category.title_ru,
            });
            if (translated && translated !== (category.title_en || category.title_ru)) {
              updates.push('title_tr = ?');
              values.push(translated);
            }
          } catch (error: any) {
            console.error(`Failed to translate title_tr for category ${category.id}:`, error.message);
          }
        }
        if (languagesToTranslate.includes('uk') && !category.title_uk) {
          try {
            const translated = await translateText({
              from: 'ru',
              to: 'uk',
              text: category.title_ru || category.title_en,
            });
            if (translated && translated !== (category.title_ru || category.title_en)) {
              updates.push('title_uk = ?');
              values.push(translated);
            }
          } catch (error: any) {
            console.error(`Failed to translate title_uk for category ${category.id}:`, error.message);
          }
        }

        // Перекладаємо description
        if (languagesToTranslate.includes('tr') && !category.description_tr) {
          try {
            const translated = await translateText({
              from: 'en',
              to: 'tr',
              text: category.description_en || category.description_ru,
            });
            if (translated && translated !== (category.description_en || category.description_ru)) {
              updates.push('description_tr = ?');
              values.push(translated);
            }
          } catch (error: any) {
            console.error(`Failed to translate description_tr for category ${category.id}:`, error.message);
          }
        }
        if (languagesToTranslate.includes('uk') && !category.description_uk) {
          try {
            const translated = await translateText({
              from: 'ru',
              to: 'uk',
              text: category.description_ru || category.description_en,
            });
            if (translated && translated !== (category.description_ru || category.description_en)) {
              updates.push('description_uk = ?');
              values.push(translated);
            }
          } catch (error: any) {
            console.error(`Failed to translate description_uk for category ${category.id}:`, error.message);
          }
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

                  if (languagesToTranslate.includes('tr') && !subcat.tr) {
                    try {
                      const translatedText = await translateText({
                        from: 'en',
                        to: 'tr',
                        text: subcat.en || subcat.ru,
                      });
                      if (translatedText && translatedText !== (subcat.en || subcat.ru)) {
                        translated.tr = translatedText;
                      }
                    } catch (error: any) {
                      console.error(`Failed to translate subcategory tr for category ${category.id}:`, error.message);
                    }
                  }

                  if (languagesToTranslate.includes('uk') && !subcat.uk) {
                    try {
                      const translatedText = await translateText({
                        from: 'ru',
                        to: 'uk',
                        text: subcat.ru || subcat.en,
                      });
                      if (translatedText && translatedText !== (subcat.ru || subcat.en)) {
                        translated.uk = translatedText;
                      }
                    } catch (error: any) {
                      console.error(`Failed to translate subcategory uk for category ${category.id}:`, error.message);
                    }
                  }

                  // Перекладаємо description підкатегорії
                  if (subcat.description) {
                    if (!translated.description) {
                      translated.description = {};
                    }
                    if (languagesToTranslate.includes('tr') && !subcat.description.tr) {
                      try {
                        const translatedText = await translateText({
                          from: 'en',
                          to: 'tr',
                          text: subcat.description.en || subcat.description.ru || '',
                        });
                        if (translatedText && translatedText !== (subcat.description.en || subcat.description.ru || '')) {
                          translated.description.tr = translatedText;
                        }
                      } catch (error: any) {
                        console.error(`Failed to translate subcategory description tr for category ${category.id}:`, error.message);
                      }
                    }
                    if (languagesToTranslate.includes('uk') && !subcat.description.uk) {
                      try {
                        const translatedText = await translateText({
                          from: 'ru',
                          to: 'uk',
                          text: subcat.description.ru || subcat.description.en || '',
                        });
                        if (translatedText && translatedText !== (subcat.description.ru || subcat.description.en || '')) {
                          translated.description.uk = translatedText;
                        }
                      } catch (error: any) {
                        console.error(`Failed to translate subcategory description uk for category ${category.id}:`, error.message);
                      }
                    }
                  }

                  return translated;
                })
              );
              updates.push('subcategories = ?');
              values.push(JSON.stringify(translatedSubcategories));
            }
          } catch (e) {
            console.error(`Error parsing subcategories for category ${category.id}:`, e);
          }
        }

        if (updates.length > 0) {
          values.push(category.id);
          const updateQuery = `UPDATE event_categories SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
          db.prepare(updateQuery).run(...values);
          translatedCount++;
        }

        // Додаємо затримку, щоб не перевантажити API перекладу
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error: any) {
        errors.push(`Category ${category.id}: ${error.message}`);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Translated ${translatedCount} categories`,
      translatedCount,
      totalCategories: categories.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Batch translation error:', error);
    return res.status(500).json({
      error: 'Failed to translate categories',
      message: error.message,
    });
  }
}

export default requireAuth(handler);
