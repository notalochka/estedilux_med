import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAnimation } from '@/lib/useAnimation';
import type { BlogPost } from '@/types/blog';
import styles from './BlogPreviewSection.module.css';

const BlogPreviewSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hooks must be called at the top level
  const { ref: titleRef, isVisible: titleVisible } = useAnimation({ threshold: 0.1 });
  const post1Ref = useAnimation({ threshold: 0.1 });
  const post2Ref = useAnimation({ threshold: 0.1 });
  const post3Ref = useAnimation({ threshold: 0.1 });
  const postRefs = [post1Ref, post2Ref, post3Ref];

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
      const data: BlogPost[] = await response.json();
      const publishedPosts = data.filter((post: BlogPost) => post.published !== false);
      const latestPosts = publishedPosts.slice(0, 3);
      setBlogPosts(latestPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className={styles.blogSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            {locale === 'ru' ? 'Блог' : 'Blog'}
          </h2>
          <div className={styles.blogGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.blogCardSkeleton}>
                <div className={styles.imageSkeleton}></div>
                <div className={styles.titleSkeleton}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <h2 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className={`${styles.sectionTitle} ${titleVisible ? styles.animateFadeInUp : ''}`}
        >
          {locale === 'ru' ? 'Блог' : 'Blog'}
        </h2>
        <div className={styles.blogGrid}>
          {blogPosts.map((post, index) => {
            const title = locale === 'ru' ? post.title.ru : post.title.en;
            const { ref, isVisible } = postRefs[index] || { ref: null, isVisible: false };
            return (
              <Link 
                key={post.id} 
                href={`/blog/${post.id}`} 
                className={styles.blogCardLink}
              >
                <article 
                  ref={ref as React.RefObject<HTMLElement>}
                  className={`${styles.blogCard} ${isVisible ? styles.animateFadeInUp : ''}`}
                  style={{ animationDelay: isVisible ? `${index * 0.15}s` : '0s' }}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      className={styles.blogImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                    />
                  </div>
                  <h3 className={styles.blogTitle}>{title}</h3>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;

