import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { getEventById, updateEvent } from '@/lib/db';
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
    const { eventId, languages } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    const event = getEventById.get(parseInt(eventId, 10)) as any;

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const languagesToTranslate = languages || ['tr', 'uk'];
    const translations: Record<string, string> = {};

    // Перекладаємо title
    if (languagesToTranslate.includes('tr') && !event.title_tr) {
      translations.title_tr = await translateText({
        from: 'en',
        to: 'tr',
        text: event.title_en || event.title_ru,
      });
    }
    if (languagesToTranslate.includes('uk') && !event.title_uk) {
      translations.title_uk = await translateText({
        from: 'ru',
        to: 'uk',
        text: event.title_ru || event.title_en,
      });
    }

    // Перекладаємо description
    if (event.description_ru || event.description_en) {
      if (languagesToTranslate.includes('tr') && !event.description_tr) {
        translations.description_tr = await translateText({
          from: 'en',
          to: 'tr',
          text: event.description_en || event.description_ru || '',
        });
      }
      if (languagesToTranslate.includes('uk') && !event.description_uk) {
        translations.description_uk = await translateText({
          from: 'ru',
          to: 'uk',
          text: event.description_ru || event.description_en || '',
        });
      }
    }

    // Перекладаємо location
    if (event.location_ru || event.location_en) {
      if (languagesToTranslate.includes('tr') && !event.location_tr) {
        translations.location_tr = await translateText({
          from: 'en',
          to: 'tr',
          text: event.location_en || event.location_ru || '',
        });
      }
      if (languagesToTranslate.includes('uk') && !event.location_uk) {
        translations.location_uk = await translateText({
          from: 'ru',
          to: 'uk',
          text: event.location_ru || event.location_en || '',
        });
      }
    }

    // Оновлюємо переклади
    if (Object.keys(translations).length > 0) {
      const { updateEventTranslations } = await import('@/lib/db');
      updateEventTranslations.run(
        translations.title_tr || null,
        translations.title_uk || null,
        translations.description_tr || null,
        translations.description_uk || null,
        translations.location_tr || null,
        translations.location_uk || null,
        parseInt(eventId, 10)
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
      error: 'Failed to translate event',
      message: error.message,
    });
  }
}

export default requireAuth(handler);
