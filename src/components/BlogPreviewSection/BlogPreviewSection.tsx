import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './BlogPreviewSection.module.css';

const BlogPreviewSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const blogPosts = [
    {
      id: 1,
      image: '/blog/1.jpg',
      title: locale === 'ru'
        ? 'Почему врач должен постоянно развиваться? 😍🚀'
        : 'Why a doctor should constantly develop? 😍🚀',
    },
    {
      id: 2,
      image: '/blog/2.jpg',
      title: locale === 'ru'
        ? 'ТОП- 5 😍 причин поехать на стажировку в Дубай с Estedilux Med ✈️💎'
        : 'TOP-5 😍 reasons to go on an internship in Dubai with Estedilux Med ✈️💎',
    },
    {
      id: 1,
      image: '/blog/1.jpg',
      title: locale === 'ru'
        ? 'Почему врач должен постоянно развиваться? 😍🚀'
        : 'Why a doctor should constantly develop? 😍🚀',
    },
  ];

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          {locale === 'ru' ? 'Блог' : 'Blog'}
        </h2>
        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.blogCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className={styles.blogImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                />
              </div>
              <h3 className={styles.blogTitle}>{post.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;

