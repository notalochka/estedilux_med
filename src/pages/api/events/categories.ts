import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllEventCategories, getEventCategoryById } from '@/lib/db';
import type { EventCategory } from '@/types/events';

export const config = {
  api: {
    responseLimit: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

        const parsedSubcategories = JSON.parse(category.subcategories);
        const formattedCategory: EventCategory = {
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

        return res.status(200).json(formattedCategory);
      } else {
        const categories = getAllEventCategories.all() as any[];

        const formattedCategories: EventCategory[] = categories.map((category) => {
          const parsedSubcategories = JSON.parse(category.subcategories);
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
        });

        return res.status(200).json(formattedCategories);
      }
    } catch (error) {
      console.error('Error fetching event categories:', error);
      return res.status(500).json({ error: 'Failed to fetch event categories' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

