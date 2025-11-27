import React from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { eventCategories } from '@/data/eventCategories';
import { events } from '@/data/events';
import type { EventCategory, Event } from '@/types/events';
import styles from './CategoryDetail.module.css';

interface CategoryDetailProps {
  category: EventCategory;
  categoryEvents: Event[];
}

const CategoryDetail: NextPage<CategoryDetailProps> = ({ category, categoryEvents }) => {
  const router = useRouter();
  const { locale } = router;

  if (!category) {
    return (
      <div className={styles.categoryPage}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <p>{locale === 'ru' ? 'Категория не найдена' : 'Category not found'}</p>
            <Link href="/events" className={styles.backButton}>
              <ArrowLeft size={18} />
              {locale === 'ru' ? 'Вернуться к категориям' : 'Back to Categories'}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {locale === 'ru' ? `${category.title.ru} - Estedilux Med` : `${category.title.en} - Estedilux Med`}
        </title>
        <meta
          name="description"
          content={
            locale === 'ru'
              ? category.description.ru
              : category.description.en
          }
        />
      </Head>

      <div className={styles.categoryPage}>
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

          {/* Content Section */}
          <section className={styles.contentSection}>
            <div className={styles.container}>
              {/* Back Button */}
              <Link href="/events" className={styles.backButton}>
                <ArrowLeft size={18} />
                <span>{locale === 'ru' ? 'Вернуться к категориям' : 'Back to Categories'}</span>
              </Link>

              {/* Category Title and Description */}
              <div className={styles.categoryInfo}>
                <h2 className={styles.categoryTitle}>
                  {locale === 'ru' ? category.title.ru : category.title.en}
                </h2>
              </div>

              <div className={styles.contentGrid}>
                {/* Left Column - Subcategories */}
                <div className={styles.subcategoriesColumn}>
                <p className={styles.categoryDescription}>
                  {locale === 'ru' ? category.description.ru : category.description.en}
                </p>
                  <div className={styles.subcategoriesList}>
                    {category.subcategories.map((subcategory, index) => (
                      <div key={index} className={styles.subcategoryItem}>
                        <h3 className={styles.subcategoryTitle}>
                          {index + 1}. {locale === 'ru' ? subcategory.ru : subcategory.en}
                        </h3>
                        {subcategory.description ? (
                          <p className={styles.subcategoryDescription}>
                            {locale === 'ru' ? subcategory.description.ru : subcategory.description.en}
                          </p>
                        ) : (
                          <p className={styles.subcategoryDescription}>
                            {locale === 'ru'
                              ? 'Программа включает теоретическую подготовку и практические занятия под руководством опытных специалистов.'
                              : 'The program includes theoretical training and practical sessions under the guidance of experienced specialists.'}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Events */}
                <div className={styles.eventsColumn}>
                  <h2 className={styles.sectionTitle}>
                    {locale === 'ru' ? 'Предстоящие программы' : 'Upcoming Programs'}
                  </h2>
                  
                  {categoryEvents.length > 0 ? (
                    <div className={styles.eventsList}>
                      {categoryEvents.map((event) => (
                        <div key={event.id} className={styles.eventCard}>
                          {event.image && (
                            <div className={styles.eventImageWrapper}>
                              <Image
                                src={event.image}
                                alt={locale === 'ru' ? event.title.ru : event.title.en}
                                fill
                                className={styles.eventImage}
                              />
                              {event.date && (
                                <div className={styles.eventDateBadge}>
                                  <Calendar size={14} />
                                  <span>
                                    {new Date(event.date).toLocaleDateString(
                                      locale === 'ru' ? 'ru-RU' : 'en-US',
                                      {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                      }
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          <div className={styles.eventContent}>
                            <h3 className={styles.eventTitle}>
                              {locale === 'ru' ? event.title.ru : event.title.en}
                            </h3>
                            {event.location && (
                              <div className={styles.eventLocation}>
                                <MapPin size={14} />
                                <span>{locale === 'ru' ? event.location.ru : event.location.en}</span>
                              </div>
                            )}
                            {event.description && (
                              <p className={styles.eventDescription}>
                                {locale === 'ru' ? event.description.ru : event.description.en}
                              </p>
                            )}
                            <button className={styles.eventButton}>
                              <span>{locale === 'ru' ? 'Регистрация' : 'Registration'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.eventsPlaceholder}>
                      <p className={styles.placeholderText}>
                        {locale === 'ru'
                          ? 'Скоро здесь появятся запланированные события и мероприятия'
                          : 'Upcoming events and activities will appear here soon'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<{ params: { categoryId: string }; locale: string }> = [];

  // Generate paths for each locale
  locales?.forEach((locale) => {
    eventCategories.forEach((category) => {
      paths.push({
        params: { categoryId: category.id },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryDetailProps> = async ({ params }) => {
  const categoryId = params?.categoryId as string;
  const category = eventCategories.find((cat) => cat.id === categoryId);

  if (!category) {
    return {
      notFound: true,
    };
  }

  // Filter events for this category
  const categoryEvents = events.filter((event) => event.categoryId === categoryId);

  return {
    props: {
      category,
      categoryEvents,
    },
  };
};

export default CategoryDetail;

