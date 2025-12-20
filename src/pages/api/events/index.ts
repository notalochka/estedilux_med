import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { getAllEvents, getPublishedEvents, getEventsByCategoryId, getPublishedEventsByCategoryId, createEvent } from '@/lib/db';
import type { Event } from '@/types/events';

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

async function publicHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { categoryId } = req.query;

      let events: any[];

      if (categoryId) {
        const catId = parseInt(categoryId as string, 10);
        if (isNaN(catId)) {
          return res.status(400).json({ error: 'Invalid category ID' });
        }
        events = getPublishedEventsByCategoryId.all(catId) as any[];
      } else {
        events = getPublishedEvents.all() as any[];
      }

      const formattedEvents: Event[] = events.map((event) => ({
        id: event.id,
        categoryId: event.category_id,
        title: {
          ru: event.title_ru,
          en: event.title_en,
        },
        ...(event.description_ru || event.description_en ? {
          description: {
            ru: event.description_ru || '',
            en: event.description_en || '',
          }
        } : {}),
        ...(event.date ? { date: event.date } : {}),
        ...(event.location_ru || event.location_en ? {
          location: {
            ru: event.location_ru || '',
            en: event.location_en || '',
          }
        } : {}),
        ...(event.price !== null && event.price !== undefined ? { price: event.price } : {}),
        ...(event.duration ? { duration: event.duration } : {}),
        ...(event.image ? { image: event.image } : {}),
        published: event.published === 1,
      }));

      return res.status(200).json(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Failed to fetch events' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function adminGetHandler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { categoryId } = req.query;

      let events: any[];

      if (categoryId) {
        const catId = parseInt(categoryId as string, 10);
        if (isNaN(catId)) {
          return res.status(400).json({ error: 'Invalid category ID' });
        }
        events = getEventsByCategoryId.all(catId) as any[];
      } else {
        events = getAllEvents.all() as any[];
      }

      const formattedEvents: Event[] = events.map((event) => ({
        id: event.id,
        categoryId: event.category_id,
        title: {
          ru: event.title_ru,
          en: event.title_en,
        },
        ...(event.description_ru || event.description_en ? {
          description: {
            ru: event.description_ru || '',
            en: event.description_en || '',
          }
        } : {}),
        ...(event.date ? { date: event.date } : {}),
        ...(event.location_ru || event.location_en ? {
          location: {
            ru: event.location_ru || '',
            en: event.location_en || '',
          }
        } : {}),
        ...(event.price !== null && event.price !== undefined ? { price: event.price } : {}),
        ...(event.duration ? { duration: event.duration } : {}),
        ...(event.image ? { image: event.image } : {}),
        published: event.published === 1,
      }));

      return res.status(200).json(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Failed to fetch events' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function protectedHandler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { category_id, title_ru, title_en, description_ru, description_en, date, location_ru, location_en, price, duration, image, published } = req.body;

      if (!category_id || !title_ru || !title_en) {
        return res.status(400).json({ error: 'Category ID, title_ru, and title_en are required' });
      }

      const categoryId = parseInt(category_id, 10);
      if (isNaN(categoryId)) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }

      const result = createEvent.run(
        categoryId,
        title_ru,
        title_en,
        description_ru || null,
        description_en || null,
        date || null,
        location_ru || null,
        location_en || null,
        price !== undefined && price !== null ? parseFloat(price) : null,
        duration || null,
        image || null,
        published === true || published === 1 ? 1 : 0
      );

      return res.status(201).json({ 
        message: 'Event created successfully',
        id: result.lastInsertRowid 
      });
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ error: 'Failed to create event' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default async function handler(req: NextApiRequest | AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const token = (req as any).cookies?.['auth-token'];
      if (token) {
        const { verifyToken } = await import('@/lib/auth');
        const user = await verifyToken(token);
        if (user) {
          (req as AuthenticatedRequest).user = user;
          return adminGetHandler(req as AuthenticatedRequest, res);
        }
      }
    } catch (error) {
    }
    return publicHandler(req, res);
  } else {
    return requireAuth(protectedHandler)(req as AuthenticatedRequest, res);
  }
}

