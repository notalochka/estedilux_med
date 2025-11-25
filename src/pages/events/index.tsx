import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { eventCategories } from '@/data/eventCategories';
import type { EventCategory } from '@/types/events';
import styles from './Events.module.css';

const Events: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);

  const handleCategoryClick = (category: EventCategory) => {
    setSelectedCategory(category);
    // Прокрутка до деталей категорії
    setTimeout(() => {
      const element = document.getElementById('category-detail');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <div className={styles.container}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  {locale === 'ru' ? 'НАПРАВЛЕНИЯ ОБУЧЕНИЯ И СТАЖИРОВОК' : 'TRAINING AND INTERNSHIP DIRECTIONS'}
                </h1>
                <div className={styles.divider}></div>
                <p className={styles.heroSubtitle}>
                  Estedilux Med — International Medical Education
                </p>
                <div className={styles.divider}></div>
                <p className={styles.heroDescription}>
                  {locale === 'ru'
                    ? 'Мы не просто обучаем - мы открываем врачам двери в международное профессиональное пространство, где важны компетентность, глубина подготовки и безупречный уровень безопасности.'
                    : 'We don\'t just teach - we open doors for doctors to the international professional space, where competence, depth of training and impeccable level of safety are important.'}
                </p>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <div className={styles.content}>
            <div className={styles.container}>
              {!selectedCategory ? (
                <>
                  <h2 className={styles.sectionTitle}>
                    {locale === 'ru' ? 'Выберите направление' : 'Choose a Direction'}
                  </h2>
                  <div className={styles.categoriesGrid}>
                    {eventCategories.map((category) => (
                      <div
                        key={category.id}
                        className={styles.categoryCard}
                        onClick={() => handleCategoryClick(category)}
                      >
                        <h3 className={styles.categoryTitle}>
                          {locale === 'ru' ? category.title.ru : category.title.en}
                        </h3>
                        <p className={styles.categoryDescription}>
                          {locale === 'ru' ? category.description.ru : category.description.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div id="category-detail" className={styles.categoryDetail}>
                  <button onClick={handleBackToCategories} className={styles.backButton}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {locale === 'ru' ? 'Вернуться к категориям' : 'Back to Categories'}
                  </button>

                  <div className={styles.categoryDetailHeader}>
                    <h2 className={styles.categoryDetailTitle}>
                      {locale === 'ru' ? selectedCategory.title.ru : selectedCategory.title.en}
                    </h2>
                    <p className={styles.categoryDetailDescription}>
                      {locale === 'ru' ? selectedCategory.description.ru : selectedCategory.description.en}
                    </p>
                  </div>

                  <div className={styles.subcategoriesSection}>
                    <h3 className={styles.subcategoriesTitle}>
                      {locale === 'ru' ? 'Программы направления' : 'Direction Programs'}
                    </h3>
                    <ul className={styles.subcategoriesList}>
                      {selectedCategory.subcategories.map((subcategory, index) => (
                        <li key={index} className={styles.subcategoryItem}>
                          <span className={styles.subcategoryText}>
                            {locale === 'ru' ? subcategory.ru : subcategory.en}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.eventsList}>
                    <h3 className={styles.eventsListTitle}>
                      {locale === 'ru' ? 'События этого направления' : 'Events in this Direction'}
                    </h3>
                    <div className={styles.emptyEvents}>
                      {locale === 'ru'
                        ? 'Скоро здесь появятся запланированные события и мероприятия'
                        : 'Upcoming events and activities will appear here soon'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Events;

