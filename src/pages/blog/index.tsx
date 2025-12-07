import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Blog.module.css';

const Blog: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

  const scrollToBlogContent = () => {
    const element = document.getElementById('blog-content-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
          <section id="blog-content-section" style={{ padding: '4rem 0', background: 'white' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
              <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '3rem' }}>
                {locale === 'ru'
                  ? 'Скоро здесь появятся статьи и новости'
                  : 'Articles and news will appear here soon'}
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;

