import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Save,
  X
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import { getImageUrl } from '@/lib/imageUtils';
import styles from './EventsAdmin.module.css';
import type { Event, EventCategory } from '@/types/events';

interface EventWithCategory extends Event {
  categoryTitle?: {
    ru: string;
    en: string;
  };
}

const EventsAdminPage: NextPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState<EventWithCategory[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    category_id: '',
    title_ru: '',
    title_en: '',
    description_ru: '',
    description_en: '',
    date: '',
    location_ru: '',
    location_en: '',
    price: '',
    duration: '',
    image: '',
    published: true,
  });

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
      const categoriesData = await fetchCategories();
      await fetchEvents(categoriesData);
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async (): Promise<EventCategory[]> => {
    try {
      const response = await fetch('/api/events/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data: EventCategory[] = await response.json();
      setCategories(data);
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  const fetchEvents = async (categoriesData?: EventCategory[]) => {
    try {
      const response = await fetch('/api/events', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch events');
      const data: Event[] = await response.json();
      
      const cats = categoriesData || categories;
      
      const eventsWithCategories = data.map(event => {
        const category = cats.find(cat => cat.id === event.categoryId);
        return {
          ...event,
          categoryTitle: category ? category.title : undefined,
        };
      });
      
      setEvents(eventsWithCategories);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleCreate = () => {
    setEditingEvent(null);
    setFormData({
      category_id: '',
      title_ru: '',
      title_en: '',
      description_ru: '',
      description_en: '',
      date: '',
      location_ru: '',
      location_en: '',
      price: '',
      duration: '',
      image: '',
      published: true,
    });
    setShowForm(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      category_id: String(event.categoryId),
      title_ru: event.title.ru,
      title_en: event.title.en,
      description_ru: event.description?.ru || '',
      description_en: event.description?.en || '',
      date: event.date || '',
      location_ru: event.location?.ru || '',
      location_en: event.location?.en || '',
      price: event.price ? String(event.price) : '',
      duration: event.duration || '',
      image: event.image || '',
      published: event.published !== false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить это событие?')) {
      return;
    }

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to delete event');
      
      fetchEvents(categories);
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Ошибка при удалении события');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingEvent 
        ? `/api/events/${editingEvent.id}`
        : '/api/events';
      
      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(formData.price) : null,
        }),
      });

      if (!response.ok) throw new Error('Failed to save event');

      setShowForm(false);
      setEditingEvent(null);
      fetchEvents(categories);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Ошибка при сохранении события');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(null);
    setFormData({
      category_id: '',
      title_ru: '',
      title_en: '',
      description_ru: '',
      description_en: '',
      date: '',
      location_ru: '',
      location_en: '',
      price: '',
      duration: '',
      image: '',
      published: true,
    });
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
        <title>Управление событиями - Estedilux Med</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.eventsAdminPage}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/admin" className={styles.backButton}>
              <ArrowLeft size={20} />
              Назад
            </Link>
            <h1 className={styles.headerTitle}>Управление событиями</h1>
            <button onClick={handleCreate} className={styles.createButton}>
              <Plus size={20} />
              Создать событие
            </button>
          </div>
        </header>

        <main className={styles.main}>
          {showForm ? (
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2>{editingEvent ? 'Редактировать событие' : 'Создать событие'}</h2>
                <button onClick={handleCancel} className={styles.closeButton}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Название (RU) *</label>
                    <input
                      type="text"
                      value={formData.title_ru}
                      onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Название (EN) *</label>
                    <input
                      type="text"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Фото события</label>
                    <ImageUpload
                      value={formData.image}
                      onChange={(value) => setFormData({ ...formData, image: value })}
                    />
                    <small className={styles.imageHint}>
                      Загрузите фото или перетащите его в поле выше
                    </small>
                  </div>
                  <div className={styles.formGroup}>  

                  <div className={styles.formGroup}>
                    <label>Категория *</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      required
                      className={styles.select}
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title.ru}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Дата</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Цена</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Локация (RU)</label>
                    <input
                      type="text"
                      value={formData.location_ru}
                      onChange={(e) => setFormData({ ...formData, location_ru: e.target.value })}
                      placeholder="Например: Стамбул, Турция"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Локация (EN)</label>
                    <input
                      type="text"
                      value={formData.location_en}
                      onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
                      placeholder="For example: Istanbul, Turkey"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Описание (RU)</label>
                    <textarea
                      value={formData.description_ru}
                      onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Описание (EN)</label>
                    <textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className={styles.checkbox}
                      />
                      <span>Опубликованное событие</span>
                    </label>
                    <small className={styles.checkboxHint}>
                      Опубликованные события отображаются на публичном сайте
                    </small>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                    Отмена
                  </button>
                  <button type="submit" className={styles.saveButton} disabled={isSaving}>
                    <Save size={18} />
                    {isSaving ? 'Сохранение...' : 'Сохранить'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className={styles.eventsList}>
              {events.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Событий пока нет. Создайте первое событие!</p>
                </div>
              ) : (
                <div className={styles.eventsGrid}>
                  {events.map((event) => (
                    <div key={event.id} className={styles.eventCard}>
                      {event.image && (
                        <div className={styles.eventCardImage}>
                          <img src={getImageUrl(event.image)} alt={event.title.ru} />
                        </div>
                      )}
                      <div className={styles.eventCardContent}>
                        <div className={styles.eventCardBadges}>
                          {event.categoryTitle && (
                            <div className={styles.eventCardCategoryBadge}>
                              {event.categoryTitle.ru}
                            </div>
                          )}
                          {event.published !== false ? (
                            <div className={styles.publishedBadge}>Опубликована</div>
                          ) : (
                            <div className={styles.draftBadge}>Черновик</div>
                          )}
                        </div>
                        <div className={styles.eventCardHeader}>
                          <h3 className={styles.eventCardTitle}>{event.title.ru}</h3>
                        </div>
                        {event.date && (
                          <p className={styles.eventCardDate}>{event.date}</p>
                        )}
                        {event.location && (
                          <p className={styles.eventCardLocation}>
                            {event.location.ru}
                          </p>
                        )}
                        {event.price && (
                          <p className={styles.eventCardPrice}>
                            {new Intl.NumberFormat('ru-RU', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(event.price)}
                          </p>
                        )}
                        <div className={styles.eventCardActions}>
                          <button
                            onClick={() => handleEdit(event)}
                            className={styles.editButton}
                          >
                            <Edit size={16} />
                            Редактировать
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className={styles.deleteButton}
                          >
                            <Trash2 size={16} />
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={handleCreate} className={styles.createButton}>
                <Plus size={20} />
                Создать событие
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default EventsAdminPage;

