import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
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
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className={styles.heading1} {...props} />,
                  h2: ({node, ...props}) => <h2 className={styles.heading2} {...props} />,
                  h3: ({node, ...props}) => <h3 className={styles.heading3} {...props} />,
                  p: ({node, ...props}) => <p className={styles.paragraph} {...props} />,
                  ul: ({node, ...props}) => <ul className={styles.list} {...props} />,
                  ol: ({node, ...props}) => <ol className={styles.orderedList} {...props} />,
                  li: ({node, ...props}) => <li className={styles.listItem} {...props} />,
                  strong: ({node, ...props}) => <strong className={styles.strong} {...props} />,
                  em: ({node, ...props}) => <em className={styles.em} {...props} />,
                  code: ({node, inline, ...props}: any) => 
                    inline ? (
                      <code className={styles.inlineCode} {...props} />
                    ) : (
                      <code className={styles.codeBlock} {...props} />
                    ),
                  pre: ({node, ...props}) => <pre className={styles.pre} {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className={styles.blockquote} {...props} />,
                  br: ({node, ...props}) => <br className={styles.lineBreak} {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            </article>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async ({ params }) => {
  const id = params?.id;

  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    // Прямий доступ до бази даних на сервері
    const { getBlogById } = await import('@/lib/db');
    const blogId = parseInt(id, 10);

    if (isNaN(blogId)) {
      return {
        notFound: true,
      };
    }

    const blog = getBlogById.get(blogId) as any;

    if (!blog) {
      return {
        notFound: true,
      };
    }

    // Перевіряємо, чи стаття опублікована
    if (blog.published !== 1) {
      return {
        notFound: true,
      };
    }

    // Конвертуємо дані з БД в формат BlogPost
    const post: BlogPost = {
      id: blog.id,
      image: blog.image,
      date: blog.date,
      title: {
        ru: blog.title_ru,
        en: blog.title_en,
      },
      content: {
        ru: blog.content_ru,
        en: blog.content_en,
      },
      published: blog.published === 1,
    };

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      notFound: true,
    };
  }
};

export default BlogPostPage;

