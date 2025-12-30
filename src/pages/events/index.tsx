import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { EventCategory } from '@/types/events';
import styles from './Events.module.css';

interface EventsPageProps {
  categories: EventCategory[];
}

const Events: NextPage<EventsPageProps> = ({ categories }) => {
  const router = useRouter();
  const { locale } = router;

  const scrollToCategories = () => {
    const element = document.getElementById('categories-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Head>
        <title>
          {locale === 'ru' ? 'События - Estedilux Med' : 'Events - Estedilux Med'}
        </title>
        <meta
          name="description"
          content={
            locale === 'ru'
              ? 'Направления обучения и стажировок Estedilux Med'
              : 'Estedilux Med training and internship directions'
          }
        />
      </Head>

      <div className={styles.eventsPage}>
        <Header />
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroBackground}>
              <Image
                src="/photo2.jpg"
                alt="Estedilux Med Background"
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
                    {locale === 'ru' ? 'Направления стажировок и обучения' : 'Training and Internship Directions'}
                  </h1>
                  <div className={styles.heroChevron} onClick={scrollToCategories}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section id="categories-section" className={styles.categoriesSection}>
            <div className={styles.container}>
              {/* Header Section */}
              <div className={styles.categoriesHeader}>
                <h2 className={styles.categoriesTitle}>
                  {locale === 'ru' ? 'Выберите направление' : 'Choose a direction'}
                </h2>
                <p className={styles.categoriesSubtitle}>
                  {locale === 'ru'
                    ? 'Мы не просто обучаем - мы открываем врачам двери в международное профессиональное пространство, где важны компетентность, глубина подготовки и безупречный уровень безопасности.'
                    : 'We don\'t just teach - we open doors for doctors to the international professional space, where competence, depth of training and impeccable level of safety are important.'}
                </p>
              </div>

              {/* Cards Grid */}
              <div className={styles.categoriesGrid}>
                {categories.map((category, index) => {
                  // Використовуємо icon з бази даних, якщо він є, інакше fallback на старий шлях
                  const categoryImage = category.icon || `/categories/photo${(index % 7) + 1}.jpg`;
                  const displaySubcategories = category.subcategories.slice(0, 4);
                  
                  // Визначаємо розмір картки залежно від позиції
                  let cardSizeClass = '';
                  if (index === 0) {
                    cardSizeClass = styles.cardLarge; // Перша велика зліва
                  } else if (index === 1 || index === 2) {
                    cardSizeClass = styles.cardMedium; // Дві середні справа в першому рядку
                  } else if (index === 3 || index === 4) {
                    cardSizeClass = styles.cardMedium; // Дві середні в другому рядку
                  } else if (index === 5 || index === 6) {
                    cardSizeClass = styles.cardSmall; // Дві маленькі зліва в третьому рядку
                  } else if (index === 7) {
                    cardSizeClass = styles.cardLarge; // Одна велика справа в третьому рядку
                  } else {
                    cardSizeClass = styles.cardMedium; // Решта середні
                  }
                  
                  return (
                    <Link
                      key={category.id}
                      href={`/events/${String(category.id)}`}
                      className={`${styles.categoryCard} ${cardSizeClass}`}
                    >
                      {/* Background Image */}
                      <div className={styles.categoryImageWrapper}>
                        <Image
                          src={categoryImage}
                          alt={locale === 'ru' ? category.title.ru : category.title.en}
                          fill
                          className={styles.categoryImage}
                        />
                        <div className={styles.categoryBlur} />
                        <div className={styles.categoryGradient} />
                      </div>

                      {/* Content */}
                      <div className={styles.categoryContent}>
                        {/* Title */}
                        <h3 className={styles.categoryTitle}>
                          {locale === 'ru' ? category.title.ru : category.title.en}
                        </h3>

                        {/* Subcategories List */}
                        <div className={styles.subcategoriesList}>
                          {displaySubcategories.map((subcategory, subIndex) => (
                            <div key={subIndex} className={styles.subcategoryItem}>
                              <div className={styles.subcategoryDot} />
                              <span className={styles.subcategoryText}>
                                {locale === 'ru' ? subcategory.ru : subcategory.en}
                              </span>
                            </div>
                          ))}
                          {category.subcategories.length - 4 > 1 && (
                            <div className={styles.subcategoryItem}>
                              <div className={styles.subcategoryDot} />
                              <span className={styles.subcategoryText}>
                                {locale === 'ru' ? `+${category.subcategories.length - 4} еще` : `+${category.subcategories.length - 4} more`}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Learn More Button - appears on hover */}
                        <div className={styles.learnMoreButton}>
                          <span>{locale === 'ru' ? 'Узнать больше' : 'Learn More'}</span>
                          <ArrowRight size={18} className={styles.arrowIcon} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<EventsPageProps> = async () => {
  try {
    const { getAllEventCategories } = await import('@/lib/db');
    const categoriesData = getAllEventCategories.all() as any[];
    
    const categories: EventCategory[] = categoriesData.map((category) => ({
      id: category.id,
      title: {
        ru: category.title_ru,
        en: category.title_en,
      },
      description: {
        ru: category.description_ru,
        en: category.description_en,
      },
      subcategories: JSON.parse(category.subcategories),
      ...(category.icon ? { icon: category.icon } : {}),
    }));
    
    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      props: {
        categories: [],
      },
    };
  }
};

export default Events;

