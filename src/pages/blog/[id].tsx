import React from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { blogPosts } from '@/data/blog';
import type { BlogPost } from '@/types/blog';
import styles from './BlogPost.module.css';

interface BlogPostPageProps {
  post: BlogPost;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  const router = useRouter();
  const { locale } = router;

  const handleBack = () => {
    router.push('/blog', '/blog', { locale });
  };

  const scrollToContent = () => {
    const element = document.getElementById('blog-post-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const title = locale === 'ru' ? post.title.ru : post.title.en;
  const content = locale === 'ru' ? post.content.ru : post.content.en;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = locale === 'ru' 
      ? ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <>
      <Head>
        <title>
          {title} - {locale === 'ru' ? 'Блог Estedilux Med' : 'Blog Estedilux Med'}
        </title>
        <meta
          name="description"
          content={title}
        />
      </Head>

      <div className={styles.blogPostPage}>
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
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <div className={styles.heroTitleWrapper}>
                  <h1 className={styles.heroTitle}>
                    {locale === 'ru' ? 'Блог' : 'Blog'}
                  </h1>
                  <div className={styles.heroChevron} onClick={scrollToContent}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Post Content */}
          <div id="blog-post-content" className={styles.contentSection}>
            <div className={styles.container}>
            {/* Back Button */}
            <button onClick={handleBack} className={styles.backButton}>
              <ArrowLeft size={20} />
              <span>{locale === 'ru' ? 'Вернуться к блогу' : 'Back to blog'}</span>
            </button>

            {/* Title */}
            <h1 className={styles.postTitle}>{title}</h1>

            {/* Date */}
            <div className={styles.postDate}>{formatDate(post.date)}</div>

            {/* Full Size Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={post.image}
                alt={title}
                width={900}
                height={600}
                className={styles.postImage}
                priority
                quality={90}
                sizes="(max-width: 500px) 100vw, 500px"
              />
            </div>

            {/* Content */}
            <article className={styles.postContent}>
              {content.map((item, index) => {
                if (item.type === 'heading') {
                  return (
                    <h2 key={index} className={styles.heading}>
                      {typeof item.content === 'string' ? item.content : ''}
                    </h2>
                  );
                }
                
                if (item.type === 'paragraph') {
                  return (
                    <p key={index} className={styles.paragraph}>
                      {typeof item.content === 'string' ? item.content : ''}
                    </p>
                  );
                }
                
                if (item.type === 'list' && Array.isArray(item.content)) {
                  return (
                    <ul key={index} className={styles.list}>
                      {item.content.map((listItem, listIndex) => (
                        <li key={listIndex} className={styles.listItem}>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                }
                
                return null;
              })}
            </article>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<{ params: { id: string }; locale?: string }> = [];

  // Генеруємо шляхи для кожної статті та кожної локалі
  blogPosts.forEach((post) => {
    locales?.forEach((locale) => {
      paths.push({
        params: { id: post.id.toString() },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params, locale }) => {
  const id = params?.id;
  const post = blogPosts.find((p) => p.id.toString() === id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default BlogPostPage;

