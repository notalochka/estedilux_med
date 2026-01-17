import React, { useState, useMemo, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Calendar, Search } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getImageUrl } from '@/lib/imageUtils';
import { t } from '@/lib/translations';
import type { BlogPost } from '@/types/blog';
import styles from './Blog.module.css';

const Blog: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const [displayedCount, setDisplayedCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      // Використовуємо fetch без credentials, щоб гарантувати публічний доступ
      const response = await fetch('/api/blog', {
        credentials: 'omit', // Не передаємо cookies
      });
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      const data = await response.json();
      // Додаткова фільтрація на клієнті (на випадок, якщо API повернув неопубліковані)
      const publishedPosts = data.filter((post: BlogPost) => post.published !== false);
      setBlogPosts(publishedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBlogContent = () => {
    const element = document.getElementById('blog-content-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Фільтруємо та сортуємо статті
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...blogPosts];

    // Фільтрація за пошуковим запитом
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((post) => {
        const title = locale === 'ru' ? post.title.ru.toLowerCase() : locale === 'tr' ? (post.title.tr || post.title.en).toLowerCase() : locale === 'uk' ? (post.title.uk || post.title.ru).toLowerCase() : post.title.en.toLowerCase();
        const content = locale === 'ru' ? post.content.ru : locale === 'tr' ? (post.content.tr || post.content.en) : locale === 'uk' ? (post.content.uk || post.content.ru) : post.content.en;
        
        // Перевіряємо назву
        if (title.includes(query)) return true;
        
        // Перевіряємо контент (Markdown текст)
        const contentText = content.toLowerCase();
        
        return contentText.includes(query);
      });
    }

    // Сортуємо за датою (від новіших до старіших)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }, [blogPosts, searchQuery, locale]);

  // Обмежуємо кількість відображених статей
  const displayedPosts = filteredAndSortedPosts.slice(0, displayedCount);
  const hasMore = filteredAndSortedPosts.length > displayedCount;

  // Скидаємо лічильник при зміні пошукового запиту
  React.useEffect(() => {
    setDisplayedCount(6);
  }, [searchQuery]);

  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + 3);
  };


  const getPreviewText = (post: BlogPost): string => {
    const content = locale === 'ru' ? post.content.ru : locale === 'tr' ? (post.content.tr || post.content.en) : locale === 'uk' ? (post.content.uk || post.content.ru) : post.content.en;
    // Видаляємо Markdown синтаксис для прев'ю
    const plainText = content
      .replace(/^#+\s+/gm, '') // Видаляємо заголовки
      .replace(/^\*\s+/gm, '') // Видаляємо маркери списків
      .replace(/\n+/g, ' ') // Замінюємо переноси на пробіли
      .trim();
    
    return plainText.length > 150 
      ? plainText.substring(0, 150) + '...'
      : plainText;
  };

  return (
    <>
      <Head>
        <title>
          {t({ ru: 'Блог - Estedilux Med', en: 'Blog - Estedilux Med', tr: 'Blog - Estedilux Med', uk: 'Блог - Estedilux Med' }, locale)}
        </title>
        <meta
          name="description"
          content={t(
            {
              ru: 'Статьи и новости о медицинском образовании',
              en: 'Articles and news about medical education',
              tr: 'Tıp eğitimi hakkında makaleler ve haberler',
              uk: 'Статті та новини про медичну освіту',
            },
            locale
          )}
        />
      </Head>

      <div className={styles.blogPage}>
        <Header />
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroBackground}>
              <Image
                src="/blog_main.jpg"
                alt="Estedilux Med Blog Background"
                fill
                className={styles.heroBannerImage}
                priority
                quality={90}
              />
              <div className={styles.heroOverlay}></div>
            </div>
            <div className={styles.container}>
              <div className={styles.heroContent}>
                <div className={styles.heroTitleWrapper}>
                  <h1 className={styles.heroTitle}>
                    {t({ ru: 'Блог', en: 'Blog', tr: 'Blog', uk: 'Блог' }, locale)}
                  </h1>
                  <div className={styles.heroChevron} onClick={scrollToBlogContent}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Content Section */}
          <section id="blog-content-section" className={styles.blogPostsSection}>
            <div className={styles.postsContainer}>
              {/* Search Field */}
              <div className={styles.searchWrapper}>
                <div className={styles.searchInputWrapper}>
                  <Search size={20} className={styles.searchIcon} />
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder={t({ ru: 'Поиск по блогу...', en: 'Search articles...', tr: 'Makalelerde ara...', uk: 'Пошук по блогу...' }, locale)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {isLoading ? (
                <p className={styles.emptyMessage}>
                  {t({ ru: 'Загрузка...', en: 'Loading...', tr: 'Yükleniyor...', uk: 'Завантаження...' }, locale)}
                </p>
              ) : filteredAndSortedPosts.length === 0 ? (
                <p className={styles.emptyMessage}>
                  {searchQuery.trim()
                    ? t({ ru: 'Статьи не найдены', en: 'No articles found', tr: 'Makale bulunamadı', uk: 'Статті не знайдено' }, locale)
                    : t({ ru: 'Скоро здесь появятся статьи и новости', en: 'Articles and news will appear here soon', tr: 'Yakında burada makaleler ve haberler görünecek', uk: 'Незабаром тут з\'являться статті та новини' }, locale)}
                </p>
              ) : (
                <>
                  <div className={styles.postsGrid}>
                    {displayedPosts.map((post) => {
                      const title = locale === 'ru' ? post.title.ru : locale === 'tr' ? (post.title.tr || post.title.en) : locale === 'uk' ? (post.title.uk || post.title.ru) : post.title.en;
                      const previewText = getPreviewText(post);
                      
                      return (
                        <article key={post.id} className={styles.postCard}>
                          <Link href={`/blog/${post.id}`} className={styles.postLink}>
                            <div className={styles.imageWrapper}>
                              <Image
                                src={getImageUrl(post.image)}
                                alt={title}
                                fill
                                className={styles.postImage}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                quality={90}
                              />
                            </div>
                            
                            <div className={styles.postContent}>
                              <h3 className={styles.postTitle}>
                                {title}
                              </h3>
                              
                              {previewText && (
                                <p className={styles.postPreview}>
                                  {previewText}
                                </p>
                              )}
                              
                              <div className={styles.readMore}>
                                {t({ ru: 'Читать далее', en: 'Read more', tr: 'Devamını oku', uk: 'Читати далі' }, locale)}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                              </div>
                            </div>
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                  
                  {hasMore && (
                    <div className={styles.loadMoreWrapper}>
                      <button onClick={handleLoadMore} className={styles.loadMoreButton}>
                        {t({ ru: 'Загрузить ещё', en: 'Load more', tr: 'Daha fazla yükle', uk: 'Завантажити ще' }, locale)}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;

