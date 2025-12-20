import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  Calendar, 
  FileText, 
  FolderOpen, 
  LogOut, 
  Settings,
  Users,
  BarChart3
} from 'lucide-react';
import styles from './Admin.module.css';

interface User {
  id: number;
  username: string;
  email?: string;
}

const AdminPage: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/admin/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Админ панель - Estedilux Med</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.adminPage}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <h1 className={styles.headerTitle}>Estedilux Med</h1>
              <p className={styles.headerSubtitle}>Админ панель</p>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.userInfo}>
                <span className={styles.username}>{user.username}</span>
                {user.email && (
                  <span className={styles.userEmail}>{user.email}</span>
                )}
              </div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                <LogOut size={18} />
                Выйти
              </button>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.container}>
            
            <div className={styles.cardsGrid}>
              <Link href="/admin/events" className={styles.card}>
                <div className={styles.cardIcon}>
                  <Calendar size={32} />
                </div>
                <h3 className={styles.cardTitle}>События</h3>
                <p className={styles.cardDescription}>
                  Управление событиями и учебными программами
                </p>
              </Link>

              <Link href="/admin/blog" className={styles.card}>
                <div className={styles.cardIcon}>
                  <FileText size={32} />
                </div>
                <h3 className={styles.cardTitle}>Блог</h3>
                <p className={styles.cardDescription}>
                  Создание и редактирование статей блога
                </p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminPage;

