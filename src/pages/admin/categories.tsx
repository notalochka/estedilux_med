import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowLeft,
  Languages,
  Plus,
  X,
  Trash2,
} from 'lucide-react';
import styles from './EventsAdmin.module.css';
import type { EventCategory } from '@/types/events';

const emptyForm = {
  title_ru: '',
  title_en: '',
  title_uk: '',
  title_tr: '',
  description_ru: '',
  description_en: '',
  icon: '',
};

const CategoriesAdminPage: NextPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatingCategoryId, setTranslatingCategoryId] = useState<number | null>(null);
  const [translatingAll, setTranslatingAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

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

  const handleCreate = () => {
    setFormData(emptyForm);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title_ru.trim() || !formData.title_en.trim()) {
      alert('Назва (RU) і (EN) обовʼязкові');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/events/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title_ru: formData.title_ru.trim(),
          title_en: formData.title_en.trim(),
          title_uk: formData.title_uk.trim() || null,
          title_tr: formData.title_tr.trim() || null,
          description_ru: formData.description_ru.trim(),
          description_en: formData.description_en.trim(),
          subcategories: [],
          icon: formData.icon.trim() || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create category');
      }

      setShowForm(false);
      setFormData(emptyForm);
      await fetchCategories();
    } catch (error: any) {
      console.error('Error creating category:', error);
      alert(`Помилка: ${error.message || 'Невідома помилка'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (categoryId: number, title: string) => {
    if (!confirm(`Видалити категорію «${title}»?`)) return;

    try {
      const response = await fetch(`/api/events/categories?id=${categoryId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete');
      }
      await fetchCategories();
    } catch (error: any) {
      alert(`Помилка: ${error.message || 'Невідома помилка'}`);
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

      alert('Переклад успішно згенеровано!');
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
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={handleCreate} className={styles.createButton}>
                <Plus size={20} />
                Створити категорію
              </button>
              <button
                onClick={handleTranslateAll}
                className={styles.translateButton}
                disabled={translatingAll}
              >
                <Languages size={20} />
                {translatingAll ? 'Переклад всіх...' : 'Перекласти всі'}
              </button>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          {showForm && (
            <div className={styles.formContainer} style={{ marginBottom: '2rem' }}>
              <div className={styles.formHeader}>
                <h2>Створити категорію</h2>
                <button onClick={handleCancel} className={styles.closeButton} type="button">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Назва (RU) *</label>
                    <input
                      type="text"
                      value={formData.title_ru}
                      onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                      required
                      placeholder="Наприклад: Кадавер курс с анатомией"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Назва (EN) *</label>
                    <input
                      type="text"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      required
                      placeholder="e.g. Cadaver Course with Anatomy"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Назва (UK)</label>
                    <input
                      type="text"
                      value={formData.title_uk}
                      onChange={(e) => setFormData({ ...formData, title_uk: e.target.value })}
                      placeholder="Опційно"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Назва (TR)</label>
                    <input
                      type="text"
                      value={formData.title_tr}
                      onChange={(e) => setFormData({ ...formData, title_tr: e.target.value })}
                      placeholder="Опційно"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Опис (RU)</label>
                  <textarea
                    value={formData.description_ru}
                    onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Опис (EN)</label>
                  <textarea
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Іконка / фото (шлях)</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="/categories/Cadaver.jpg"
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                    Скасувати
                  </button>
                  <button type="submit" className={styles.saveButton} disabled={isSaving}>
                    {isSaving ? 'Збереження...' : 'Зберегти'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className={styles.eventsList}>
            {categories.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Категорій поки немає.</p>
                <button onClick={handleCreate} className={styles.createButton} style={{ marginTop: '1rem' }}>
                  <Plus size={20} />
                  Створити першу категорію
                </button>
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

                      {category.description?.ru && (
                        <p className={styles.eventCardLocation} style={{ marginTop: '0.5rem' }}>
                          {category.description.ru.substring(0, 150)}
                          {category.description.ru.length > 150 ? '...' : ''}
                        </p>
                      )}

                      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {category.title.tr && (
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            background: '#dbeafe',
                            color: '#1e40af',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
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
                            fontSize: '0.75rem',
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
                            fontSize: '0.75rem',
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
                        <button
                          onClick={() => handleDelete(category.id, category.title.ru)}
                          className={styles.deleteButton}
                          title="Видалити"
                        >
                          <Trash2 size={16} />
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
