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
import MarkdownEditor from '@/components/MarkdownEditor/MarkdownEditor';
import styles from './BlogAdmin.module.css';

interface BlogPost {
  id: number;
  image: string;
  date: string;
  title: {
    ru: string;
    en: string;
  };
  content: {
    ru: string;
    en: string;
  };
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

const BlogAdminPage: NextPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    image: '',
    date: '',
    title_ru: '',
    title_en: '',
    content_ru: '',
    content_en: '',
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
      fetchBlogs();
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog', {
        credentials: 'include', // Включаємо cookies для автентифікації
      });
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData({
      image: '',
      date: new Date().toISOString().split('T')[0],
      title_ru: '',
      title_en: '',
      content_ru: '',
      content_en: '',
      published: true,
    });
    setShowForm(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      image: blog.image,
      date: blog.date,
      title_ru: blog.title.ru,
      title_en: blog.title.en,
      content_ru: blog.content.ru,
      content_en: blog.content.en,
      published: blog.published !== false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту статью?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete blog');
      
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Ошибка при удалении статьи');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingBlog 
        ? `/api/blog/${editingBlog.id}`
        : '/api/blog';
      
      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          published: formData.published ? 1 : 0,
        }),
      });

      if (!response.ok) throw new Error('Failed to save blog');

      setShowForm(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Ошибка при сохранении статьи');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
    setFormData({
      image: '',
      date: '',
      title_ru: '',
      title_en: '',
      content_ru: '',
      content_en: '',
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
        <title>Управление блогом - Estedilux Med</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.blogAdminPage}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/admin" className={styles.backButton}>
              <ArrowLeft size={20} />
              Назад
            </Link>
            <h1 className={styles.headerTitle}>Управление блогом</h1>
            <button onClick={handleCreate} className={styles.createButton}>
              <Plus size={20} />
              Создать статью
            </button>
          </div>
        </header>

        <main className={styles.main}>
          {showForm ? (
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2>{editingBlog ? 'Редактировать статью' : 'Создать статью'}</h2>
                <button onClick={handleCancel} className={styles.closeButton}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Заголовок (RU)</label>
                    <input
                      type="text"
                      value={formData.title_ru}
                      onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Заголовок (EN)</label>
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
                    <label>Дата</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Фото статьи</label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(value) => setFormData({ ...formData, image: value })}
                  />
                  <small className={styles.imageHint}>
                    Загрузите фото или перетащите его в поле выше
                  </small>
                </div>

                

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Текст статьи (RU) *</label>
                    <MarkdownEditor
                      value={formData.content_ru}
                      onChange={(value) => setFormData({ ...formData, content_ru: value })}
                      name="content_ru"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Текст статьи (EN) *</label>
                    <MarkdownEditor
                      value={formData.content_en}
                      onChange={(value) => setFormData({ ...formData, content_en: value })}
                      name="content_en"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className={styles.checkbox}
                    />
                    <span>Опубликована статья</span>
                  </label>
                  <small className={styles.checkboxHint}>
                    Опубликованные статьи отображаются на публичном сайте
                  </small>
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
            <div className={styles.blogsList}>
              {blogs.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Статей пока нет. Создайте первую статью!</p>
                </div>
              ) : (
                <div className={styles.blogsGrid}>
                  {blogs.map((blog) => (
                    <div key={blog.id} className={styles.blogCard}>
                      <div className={styles.blogCardImage}>
                        <img src={blog.image} alt={blog.title.ru} />
                      </div>
                      <div className={styles.blogCardContent}>
                        <div className={styles.blogCardHeader}>
                          <h3 className={styles.blogCardTitle}>{blog.title.ru}</h3>
                          
                        </div>
                        <p className={styles.blogCardDate}>{blog.date}</p>
                        {(blog.published ?? true) ? (
                            <span className={styles.publishedBadge}>Опубликована</span>
                          ) : (
                            <span className={styles.draftBadge}>Черновик</span>
                          )}
                        <div className={styles.blogCardActions}>
                          <button
                            onClick={() => handleEdit(blog)}
                            className={styles.editButton}
                          >
                            <Edit size={16} />
                            Редактировать
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
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
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default BlogAdminPage;

