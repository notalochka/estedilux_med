import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { blogPosts } from '@/data/blog';
import { createBlog, getBlogById } from '@/lib/db';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let imported = 0;
    let skipped = 0;
    let errors = 0;
    const errorsList: string[] = [];

    for (const post of blogPosts) {
      try {
        const existing = getBlogById.get(post.id) as any;

        if (existing) {
          skipped++;
          continue;
        }

        createBlog.run(
          post.image,
          post.date,
          post.title.ru,
          post.title.en,
          post.content.ru,
          post.content.en
        );

        imported++;
      } catch (error: any) {
        errors++;
        errorsList.push(`${post.title.ru}: ${error.message}`);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Import completed',
      stats: {
        imported,
        skipped,
        errors,
      },
      errors: errorsList.length > 0 ? errorsList : undefined,
    });
  } catch (error: any) {
    console.error('Import error:', error);
    return res.status(500).json({ error: 'Failed to import blog data', details: error.message });
  }
}

export default requireAuth(handler);

