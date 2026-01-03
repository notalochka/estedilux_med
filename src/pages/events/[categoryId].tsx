import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
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
                src="/hero_background.jpg"
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
                
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className={styles.contentSection}>
            <div className={styles.container}>
              {/* Category Title */}
              <div className={styles.categoryInfo}>
                <h2 className={styles.categoryTitle}>
                  {locale === 'ru' ? category.title.ru : category.title.en}
                </h2>
                <p className={styles.categoryDescription}>
                  {locale === 'ru' ? category.description.ru : category.description.en}
                </p>
              </div>

              {/* Content Grid with Capabilities on the left and Events on the right */}
              <div className={styles.contentGrid}>
                {/* Left Column - Capabilities */}
                <div className={styles.capabilitiesColumn}>
                  <h3 className={styles.capabilitiesTitle}>
                    {locale === 'ru' ? 'Наши возможности' : 'Our Capabilities'}
                  </h3>
                  <div className={styles.capabilitiesList}>
                    {category.subcategories.map((subcategory, index) => (
                      <div key={index} className={styles.capabilityCard}>
                        <div className={styles.capabilityIcon}>
                          <div className={styles.iconCircle}>
                            <span>{index + 1}</span>
                          </div>
                        </div>
                        <h4 className={styles.capabilityCardTitle}>
                          {locale === 'ru' ? subcategory.ru : subcategory.en}
                        </h4>
                        <ul className={styles.capabilityList}>
                          {subcategory.description ? (
                            <li className={styles.capabilityItem}>
                              {locale === 'ru' ? subcategory.description.ru : subcategory.description.en}
                            </li>
                          ) : (
                            <>
                              <li className={styles.capabilityItem}>
                                {locale === 'ru'
                                  ? 'Теоретическая подготовка и практические занятия'
                                  : 'Theoretical training and practical sessions'}
                              </li>
                              <li className={styles.capabilityItem}>
                                {locale === 'ru'
                                  ? 'Руководство опытных специалистов'
                                  : 'Guidance from experienced specialists'}
                              </li>
                              <li className={styles.capabilityItem}>
                                {locale === 'ru'
                                  ? 'Международные стандарты обучения'
                                  : 'International training standards'}
                              </li>
                            </>
                          )}
                        </ul>
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
                            <Link href={`/event/${event.id}`} className={styles.eventButton}>
                              <span>{locale === 'ru' ? 'Регистрация' : 'Registration'}</span>
                            </Link>
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

              {/* Contact Section */}
              <section className={styles.contactSection}>
                <h3 className={styles.contactTitle}>
                  {locale === 'ru' ? 'Остались вопросы?' : 'Have any questions?'}
                </h3>
                <p className={styles.contactText}>
                  {locale === 'ru' 
                    ? 'Пишите нашему менеджеру, и мы с радостью ответим на все ваши вопросы'
                    : 'Write to our manager, and we will be happy to answer all your questions'}
                </p>
                <Link href="/contact" className={styles.contactButton}>
                  <span>{locale === 'ru' ? 'Связаться с нами' : 'Contact Us'}</span>
                </Link>
              </section>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CategoryDetailProps> = async ({ params }) => {
  try {
    const categoryIdParam = params?.categoryId as string;
    const categoryId = parseInt(categoryIdParam, 10);
    
    if (isNaN(categoryId)) {
      return {
        notFound: true,
      };
    }
    
    const { getEventCategoryById, getPublishedEventsByCategoryId } = await import('@/lib/db');
    
    // Fetch category
    const categoryData = getEventCategoryById.get(categoryId) as any;
    if (!categoryData) {
      return {
        notFound: true,
      };
    }
    
    const category: EventCategory = {
      id: categoryData.id,
      title: {
        ru: categoryData.title_ru,
        en: categoryData.title_en,
      },
      description: {
        ru: categoryData.description_ru,
        en: categoryData.description_en,
      },
      subcategories: JSON.parse(categoryData.subcategories),
      ...(categoryData.icon ? { icon: categoryData.icon } : {}),
    };

    // Fetch only published events for this category
    const eventsData = getPublishedEventsByCategoryId.all(categoryId) as any[];
    const categoryEvents: Event[] = eventsData.map((event) => ({
      id: event.id,
      categoryId: event.category_id,
      title: {
        ru: event.title_ru,
        en: event.title_en,
      },
      ...(event.description_ru || event.description_en ? {
        description: {
          ru: event.description_ru || '',
          en: event.description_en || '',
        }
      } : {}),
      ...(event.date ? { date: event.date } : {}),
      ...(event.location_ru || event.location_en ? {
        location: {
          ru: event.location_ru || '',
          en: event.location_en || '',
        }
      } : {}),
      ...(event.price !== null && event.price !== undefined ? { price: event.price } : {}),
      ...(event.duration ? { duration: event.duration } : {}),
      ...(event.image ? { image: event.image } : {}),
    }));

    return {
      props: {
        category,
        categoryEvents,
      },
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return {
      notFound: true,
    };
  }
};

export default CategoryDetail;

