import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { getEventById, updateEvent, deleteEvent } from '@/lib/db';
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
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid event ID' });
      }

      const eventId = parseInt(id, 10);
      if (isNaN(eventId)) {
        return res.status(400).json({ error: 'Invalid event ID' });
      }

      const event = getEventById.get(eventId) as any;

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      if (event.published !== 1) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const formattedEvent: Event = {
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
      };

      return res.status(200).json(formattedEvent);
    } catch (error) {
      console.error('Error fetching event:', error);
      return res.status(500).json({ error: 'Failed to fetch event' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function protectedHandler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  const eventId = parseInt(id, 10);

  if (isNaN(eventId)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  if (req.method === 'PUT') {
    try {
      const { category_id, title_ru, title_en, description_ru, description_en, date, location_ru, location_en, price, duration, image, published } = req.body;

      if (!category_id || !title_ru || !title_en) {
        return res.status(400).json({ error: 'Category ID, title_ru, and title_en are required' });
      }

      const categoryId = parseInt(category_id, 10);
      if (isNaN(categoryId)) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }

      const event = getEventById.get(eventId) as any;

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      updateEvent.run(
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
        published === true || published === 1 ? 1 : 0,
        eventId
      );

      return res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
      console.error('Error updating event:', error);
      return res.status(500).json({ error: 'Failed to update event' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const event = getEventById.get(eventId) as any;

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      deleteEvent.run(eventId);

      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ error: 'Failed to delete event' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function adminGetHandler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid event ID' });
      }

      const eventId = parseInt(id, 10);
      if (isNaN(eventId)) {
        return res.status(400).json({ error: 'Invalid event ID' });
      }

      const event = getEventById.get(eventId) as any;

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const formattedEvent: Event = {
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
      };

      return res.status(200).json(formattedEvent);
    } catch (error) {
      console.error('Error fetching event:', error);
      return res.status(500).json({ error: 'Failed to fetch event' });
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

