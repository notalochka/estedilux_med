import type { NextApiRequest, NextApiResponse } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { path: imagePath } = req.query;

    if (!imagePath || !Array.isArray(imagePath)) {
      return res.status(400).json({ error: 'Invalid path' });
    }

    // Безпека: перевіряємо, що шлях не містить небезпечних символів
    const safePath = imagePath.join('/');
    if (safePath.includes('..') || safePath.startsWith('/')) {
      return res.status(400).json({ error: 'Invalid path' });
    }

    // Формуємо повний шлях до файлу
    const filePath = path.join(process.cwd(), 'public', safePath);

    // Перевіряємо, чи файл існує
    if (!existsSync(filePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Читаємо файл
    const fileBuffer = await readFile(filePath);

    // Визначаємо MIME тип на основі розширення
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Встановлюємо headers для кешування (опціонально)
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    
    // Віддаємо файл
    return res.status(200).send(fileBuffer);
  } catch (error: any) {
    console.error('Image serving error:', error);
    return res.status(500).json({ error: 'Failed to serve image', details: error.message });
  }
}

