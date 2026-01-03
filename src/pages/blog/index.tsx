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
        const title = locale === 'ru' ? post.title.ru.toLowerCase() : post.title.en.toLowerCase();
        const content = locale === 'ru' ? post.content.ru : post.content.en;
        
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = locale === 'ru' 
      ? ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getPreviewText = (post: BlogPost): string => {
    const content = locale === 'ru' ? post.content.ru : post.content.en;
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
          {locale === 'ru' ? 'Блог - Estedilux Med' : 'Blog - Estedilux Med'}
        </title>
        <meta
          name="description"
          content={
            locale === 'ru'
              ? 'Статьи и новости о медицинском образовании'
              : 'Articles and news about medical education'
          }
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
                    {locale === 'ru' ? 'Блог' : 'Blog'}
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
                    placeholder={locale === 'ru' ? 'Поиск по блогу...' : 'Search articles...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {isLoading ? (
                <p className={styles.emptyMessage}>
                  {locale === 'ru' ? 'Загрузка...' : 'Loading...'}
                </p>
              ) : filteredAndSortedPosts.length === 0 ? (
                <p className={styles.emptyMessage}>
                  {searchQuery.trim()
                    ? (locale === 'ru'
                        ? 'Статьи не найдены'
                        : 'No articles found')
                    : (locale === 'ru'
                        ? 'Скоро здесь появятся статьи и новости'
                        : 'Articles and news will appear here soon')}
                </p>
              ) : (
                <>
                  <div className={styles.postsGrid}>
                    {displayedPosts.map((post) => {
                      const title = locale === 'ru' ? post.title.ru : post.title.en;
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
                              <div className={styles.dateBadge}>
                                <Calendar size={14} />
                                <span>{formatDate(post.date)}</span>
                              </div>
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
                                {locale === 'ru' ? 'Читать далее' : 'Read more'}
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
                        {locale === 'ru' ? 'Загрузить ещё' : 'Load more'}
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

