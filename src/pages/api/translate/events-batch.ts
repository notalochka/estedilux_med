import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { getAllEvents } from '@/lib/db';
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

    const events = getAllEvents.all() as any[];
    const db = (await import('@/lib/db')).default;

    let translatedCount = 0;
    const errors: string[] = [];

    for (const event of events) {
      try {
        const updates: string[] = [];
        const values: any[] = [];

        // Перекладаємо title
        if (languagesToTranslate.includes('tr') && !event.title_tr && (event.title_en || event.title_ru)) {
          const translated = await translateText({
            from: 'en',
            to: 'tr',
            text: event.title_en || event.title_ru,
          });
          updates.push('title_tr = ?');
          values.push(translated);
        }
        if (languagesToTranslate.includes('uk') && !event.title_uk && (event.title_ru || event.title_en)) {
          const translated = await translateText({
            from: 'ru',
            to: 'uk',
            text: event.title_ru || event.title_en,
          });
          updates.push('title_uk = ?');
          values.push(translated);
        }

        // Перекладаємо description
        if (event.description_ru || event.description_en) {
          if (languagesToTranslate.includes('tr') && !event.description_tr) {
            const translated = await translateText({
              from: 'en',
              to: 'tr',
              text: event.description_en || event.description_ru || '',
            });
            updates.push('description_tr = ?');
            values.push(translated);
          }
          if (languagesToTranslate.includes('uk') && !event.description_uk) {
            const translated = await translateText({
              from: 'ru',
              to: 'uk',
              text: event.description_ru || event.description_en || '',
            });
            updates.push('description_uk = ?');
            values.push(translated);
          }
        }

        // Перекладаємо location
        if (event.location_ru || event.location_en) {
          if (languagesToTranslate.includes('tr') && !event.location_tr) {
            const translated = await translateText({
              from: 'en',
              to: 'tr',
              text: event.location_en || event.location_ru || '',
            });
            updates.push('location_tr = ?');
            values.push(translated);
          }
          if (languagesToTranslate.includes('uk') && !event.location_uk) {
            const translated = await translateText({
              from: 'ru',
              to: 'uk',
              text: event.location_ru || event.location_en || '',
            });
            updates.push('location_uk = ?');
            values.push(translated);
          }
        }

        if (updates.length > 0) {
          values.push(event.id);
          const updateQuery = `UPDATE events SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
          db.prepare(updateQuery).run(...values);
          translatedCount++;
        }

        // Додаємо невелику затримку, щоб не перевантажити API перекладу
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error: any) {
        errors.push(`Event ${event.id}: ${error.message}`);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Translated ${translatedCount} events`,
      translatedCount,
      totalEvents: events.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Batch translation error:', error);
    return res.status(500).json({
      error: 'Failed to translate events',
      message: error.message,
    });
  }
}

export default requireAuth(handler);
