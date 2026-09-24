import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllEventCategories,
  getEventCategoryById,
  createEventCategory,
  deleteEventCategory,
} from '@/lib/db';
import type { EventCategory } from '@/types/events';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};

function formatCategory(category: any): EventCategory {
  const parsedSubcategories = JSON.parse(category.subcategories || '[]');
  return {
    id: category.id,
    title: {
      ru: category.title_ru,
      en: category.title_en,
      ...(category.title_tr ? { tr: category.title_tr } : {}),
      ...(category.title_uk ? { uk: category.title_uk } : {}),
    },
    description: {
      ru: category.description_ru,
      en: category.description_en,
      ...(category.description_tr ? { tr: category.description_tr } : {}),
      ...(category.description_uk ? { uk: category.description_uk } : {}),
    },
    subcategories: parsedSubcategories,
    icon: category.icon || undefined,
  };
}

function getHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (id) {
      const categoryId = parseInt(id as string, 10);
      if (isNaN(categoryId)) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }

      const category = getEventCategoryById.get(categoryId) as any;
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      return res.status(200).json(formatCategory(category));
    }

    const categories = getAllEventCategories.all() as any[];
    return res.status(200).json(categories.map(formatCategory));
  } catch (error) {
    console.error('Error fetching event categories:', error);
    return res.status(500).json({ error: 'Failed to fetch event categories' });
  }
}

async function postHandler(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const {
      title_ru,
      title_en,
      title_tr,
      title_uk,
      description_ru,
      description_en,
      description_tr,
      description_uk,
      subcategories,
      icon,
    } = req.body;

    if (!title_ru || !title_en) {
      return res.status(400).json({ error: 'title_ru and title_en are required' });
    }

    const subcats = Array.isArray(subcategories) ? subcategories : [];
    const result = createEventCategory.run(
      title_ru,
      title_en,
      title_tr || null,
      title_uk || null,
      description_ru || '',
      description_en || '',
      description_tr || null,
      description_uk || null,
      JSON.stringify(subcats),
      icon || null
    );

    return res.status(201).json({
      message: 'Category created successfully',
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ error: 'Failed to create category' });
  }
}

async function deleteHandler(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const id = parseInt(String(req.query.id || req.body?.id), 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const existing = getEventCategoryById.get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Category not found' });
    }

    deleteEventCategory.run(id);
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ error: 'Failed to delete category' });
  }
}

export default async function handler(req: NextApiRequest | AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getHandler(req, res);
  }

  if (req.method === 'POST' || req.method === 'DELETE') {
    return requireAuth(async (authReq, authRes) => {
      if (req.method === 'POST') {
        return postHandler(authReq, authRes);
      }
      return deleteHandler(authReq, authRes);
    })(req as AuthenticatedRequest, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
