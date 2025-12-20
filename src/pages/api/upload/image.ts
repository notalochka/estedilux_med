import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, type AuthenticatedRequest } from '@/lib/authMiddleware';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!req.body || !req.body.image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const base64Data = req.body.image;
    
    if (!base64Data.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Invalid image format' });
    }

    const matches = base64Data.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'Invalid base64 format' });
    }

    const fileType = matches[1];
    const base64String = matches[2];
    const buffer = Buffer.from(base64String, 'base64');

    const fileName = `${uuidv4()}.${fileType}`;
    const uploadDir = path.join(process.cwd(), 'public', 'blog');
    const filePath = path.join(uploadDir, fileName);

    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error: any) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    await writeFile(filePath, buffer);

    const publicPath = `/blog/${fileName}`;
    
    return res.status(200).json({ path: publicPath });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to upload image', details: error.message });
  }
}

export default requireAuth(handler);

