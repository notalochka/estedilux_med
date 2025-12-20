import type { NextApiRequest, NextApiResponse } from 'next';
import { login } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const result = await login(username, password);

    if (!result.success) {
      return res.status(401).json({ error: result.error });
    }

    res.setHeader(
      'Set-Cookie',
      `auth-token=${result.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
    );

    return res.status(200).json({ 
      success: true, 
      user: result.user 
    });
  } catch (error) {
    console.error('Login API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

