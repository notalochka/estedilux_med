import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './auth';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: number;
    username: string;
    email?: string;
  };
}

export function requireAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const token = req.cookies['auth-token'];

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await verifyToken(token);

      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
}

