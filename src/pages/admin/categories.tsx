import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  ArrowLeft,
  Languages,
  Save,
  X
} from 'lucide-react';
import styles from './EventsAdmin.module.css';
import type { EventCategory } from '@/types/events';

const CategoriesAdminPage: NextPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatingCategoryId, setTranslatingCategoryId] = useState<number | null>(null);
  const [translatingAll, setTranslatingAll] = useState(false);

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
      setIsAuthenticated(true);
      await fetchCategories();
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/events/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data: EventCategory[] = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleTranslateCategory = async (categoryId: number) => {
    if (!confirm('Перекласти категорію турецькою та українською мовами? Це може зайняти деякий час.')) {
      return;
    }

    setIsTranslating(true);
    setTranslatingCategoryId(categoryId);

    try {
      const response = await fetch('/api/translate/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          categoryId,
          languages: ['tr', 'uk'],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to translate category');
      }

      const result = await response.json();
      alert('Переклад успішно згенеровано!');
      
      // Оновлюємо список категорій
      await fetchCategories();
    } catch (error: any) {
      console.error('Error translating category:', error);
      alert(`Помилка при перекладі: ${error.message || 'Невідома помилка'}`);
    } finally {
      setIsTranslating(false);
      setTranslatingCategoryId(null);
    }
  };

  const handleTranslateAll = async () => {
    if (!confirm('Перекласти всі категорії турецькою та українською мовами? Це може зайняти багато часу.')) {
      return;
    }

    setTranslatingAll(true);

    try {
      const response = await fetch('/api/translate/categories-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          languages: ['tr', 'uk'],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to translate categories');
      }

      const result = await response.json();
      alert(`Переклад завершено! Перекладено ${result.translatedCount} з ${result.totalCategories} категорій.`);
      
      // Оновлюємо список категорій
      await fetchCategories();
    } catch (error: any) {
      console.error('Error translating categories:', error);
      alert(`Помилка при перекладі: ${error.message || 'Невідома помилка'}`);
    } finally {
      setTranslatingAll(false);
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Управление категориями - Estedilux Med</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.eventsAdminPage}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/admin" className={styles.backButton}>
              <ArrowLeft size={20} />
              Назад
            </Link>
            <h1 className={styles.headerTitle}>Управление категориями</h1>
            <button 
              onClick={handleTranslateAll} 
              className={styles.translateButton}
              disabled={translatingAll}
            >
              <Languages size={20} />
              {translatingAll ? 'Переклад всіх...' : 'Перекласти всі категорії'}
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.eventsList}>
            {categories.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Категорій поки немає.</p>
              </div>
            ) : (
              <div className={styles.eventsGrid}>
                {categories.map((category) => (
                  <div key={category.id} className={styles.eventCard}>
                    <div className={styles.eventCardContent}>
                      <div className={styles.eventCardHeader}>
                        <h3 className={styles.eventCardTitle}>{category.title.ru}</h3>
                        <p className={styles.eventCardDate} style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {category.title.en}
                        </p>
                      </div>
                      
                      {category.description && (
                        <p className={styles.eventCardLocation} style={{ marginTop: '0.5rem' }}>
                          {category.description.ru.substring(0, 150)}...
                        </p>
                      )}

                      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {category.title.tr && (
                          <span style={{ 
                            padding: '0.25rem 0.5rem', 
                            background: '#dbeafe', 
                            color: '#1e40af', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem' 
                          }}>
                            🇹🇷 TR
                          </span>
                        )}
                        {category.title.uk && (
                          <span style={{ 
                            padding: '0.25rem 0.5rem', 
                            background: '#dbeafe', 
                            color: '#1e40af', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem' 
                          }}>
                            🇺🇦 UK
                          </span>
                        )}
                        {!category.title.tr && !category.title.uk && (
                          <span style={{ 
                            padding: '0.25rem 0.5rem', 
                            background: '#fee2e2', 
                            color: '#991b1b', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem' 
                          }}>
                            Потрібен переклад
                          </span>
                        )}
                      </div>

                      <div className={styles.eventCardActions} style={{ marginTop: '1rem' }}>
                        <button
                          onClick={() => handleTranslateCategory(category.id)}
                          className={styles.translateButton}
                          disabled={isTranslating && translatingCategoryId === category.id}
                          title="Перекласти турецькою та українською"
                        >
                          <Languages size={16} />
                          {isTranslating && translatingCategoryId === category.id ? 'Переклад...' : 'Перекласти'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoriesAdminPage;
