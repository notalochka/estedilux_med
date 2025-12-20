import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { getAllBlogs, getPublishedBlogs, createBlog } from '@/lib/db';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

async function publicHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const blogs = getPublishedBlogs.all();
      
      const formattedBlogs = blogs.map((blog: any) => ({
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
      }));

      return res.status(200).json(formattedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function protectedHandler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { image, date, title_ru, title_en, content_ru, content_en, published } = req.body;

      if (!image || !date || !title_ru || !title_en || !content_ru || !content_en) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const publishedValue = published === true || published === 1 ? 1 : 0;
      const result = createBlog.run(image, date, title_ru, title_en, content_ru, content_en, publishedValue);
      const blogId = (result as any).lastInsertRowid;

      return res.status(201).json({ 
        id: blogId,
        message: 'Blog post created successfully' 
      });
    } catch (error) {
      console.error('Error creating blog:', error);
      return res.status(500).json({ error: 'Failed to create blog post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function adminGetHandler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const blogs = getAllBlogs.all();
      
      const formattedBlogs = blogs.map((blog: any) => ({
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
      }));

      return res.status(200).json(formattedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default async function handler(req: NextApiRequest | AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const token = req.cookies?.['auth-token'];
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

