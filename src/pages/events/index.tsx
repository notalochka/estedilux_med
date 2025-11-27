import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { eventCategories } from '@/data/eventCategories';
import type { EventCategory } from '@/types/events';
import styles from './Events.module.css';

const Events: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

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
                <h1 className={styles.heroTitle}>
                  {locale === 'ru' ? 'Направления обучения и стажировок' : 'Training and Internship Directions'}
                </h1>
                <p className={styles.heroDescription}>
                  {locale === 'ru'
                    ? 'Мы не просто обучаем - мы открываем врачам двери в международное профессиональное пространство, где важны компетентность, глубина подготовки и безупречный уровень безопасности.'
                    : 'We don\'t just teach - we open doors for doctors to the international professional space, where competence, depth of training and impeccable level of safety are important.'}
                </p>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className={styles.categoriesSection}>
            <div className={styles.container}>
              {/* Header Section */}
              <div className={styles.categoriesHeader}>
                <h2 className={styles.categoriesTitle}>
                  {locale === 'ru' ? 'Направления' : 'Directions'}
                </h2>
                <p className={styles.categoriesSubtitle}>
                  {locale === 'ru'
                    ? 'Выберите для себя наиболее удобное направление обучения, или задайте нам вопрос. Мы точно посоветуем вам наилучшее.'
                    : 'Choose the most convenient training direction for yourself, or ask us. We will definitely recommend the best one for you.'}
                </p>
                
                {/* Arrow from title to cards */}
                <div className={styles.arrowWrapper}>
                  <div className={styles.arrowContainer}>
                    <Image
                      src="/Arrow.png"
                      alt=""
                      width={120}
                      height={120}
                      className={styles.arrow}
                    />
                  </div>
                </div>
              </div>

              {/* Cards Grid */}
              <div className={styles.categoriesGrid}>
                {eventCategories.map((category, index) => {
                  const categoryImage = `/categories/photo${(index % 7) + 1}.jpg`;
                  const displaySubcategories = category.subcategories.slice(0, 4);
                  
                  return (
                    <Link
                      key={category.id}
                      href={`/events/${category.id}`}
                      className={styles.categoryCard}
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

export default Events;

