import { SignJWT, jwtVerify } from 'jose';
import { getUserByUsername, getUserById } from './db';
import bcrypt from 'bcryptjs';

const secretKey = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const encodedKey = new TextEncoder().encode(secretKey);

export interface User {
  id: number;
  username: string;
  email?: string;
}

export async function login(username: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  try {
    const user = getUserByUsername.get(username) as any;
    
    if (!user) {
      return { success: false, error: 'Невірне ім\'я користувача або пароль' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return { success: false, error: 'Невірне ім\'я користувача або пароль' };
    }

    const token = await new SignJWT({ userId: user.id, username: user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(encodedKey);

    const userData: User = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return { success: true, user: userData, token };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Помилка при вході в систему' };
  }
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    const userId = payload.userId as number;

    const user = getUserById.get(userId) as any;

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  } catch (error) {
    return null;
  }
}

