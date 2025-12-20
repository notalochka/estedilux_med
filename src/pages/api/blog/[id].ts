import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { getBlogById, updateBlog, deleteBlog } from '@/lib/db';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

async function publicHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid blog ID' });
  }

  const blogId = parseInt(id, 10);

  if (isNaN(blogId)) {
    return res.status(400).json({ error: 'Invalid blog ID' });
  }

  if (req.method === 'GET') {
    try {
      const blog = getBlogById.get(blogId) as any;

      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      if (blog.published !== 1) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      const formattedBlog = {
        id: blog.id,
        image: blog.image,
        date: blog.date,
        title: {
          ru: blog.title_ru,
          en: blog.title_en,
        },
        content: {
          ru: blog.content_ru,
          en: blog.content_en,
        },
        published: blog.published === 1,
        created_at: blog.created_at,
        updated_at: blog.updated_at,
      };

      return res.status(200).json(formattedBlog);
    } catch (error) {
      console.error('Error fetching blog:', error);
      return res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function protectedHandler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid blog ID' });
  }

  const blogId = parseInt(id, 10);

  if (isNaN(blogId)) {
    return res.status(400).json({ error: 'Invalid blog ID' });
  }

  if (req.method === 'PUT') {
    try {
      const { image, date, title_ru, title_en, content_ru, content_en, published } = req.body;

      if (!image || !date || !title_ru || !title_en || !content_ru || !content_en) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const blog = getBlogById.get(blogId) as any;

      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      const publishedValue = published === true || published === 1 ? 1 : 0;
      updateBlog.run(image, date, title_ru, title_en, content_ru, content_en, publishedValue, blogId);

      return res.status(200).json({ message: 'Blog post updated successfully' });
    } catch (error) {
      console.error('Error updating blog:', error);
      return res.status(500).json({ error: 'Failed to update blog post' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const blog = getBlogById.get(blogId) as any;

      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      deleteBlog.run(blogId);

      return res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      return res.status(500).json({ error: 'Failed to delete blog post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default function handler(req: NextApiRequest | AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return publicHandler(req, res);
  } else {
    return requireAuth(protectedHandler)(req as AuthenticatedRequest, res);
  }
}

