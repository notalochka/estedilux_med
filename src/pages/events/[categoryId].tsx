import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getCountryFromLocation } from '@/lib/countryUtils';
import { t } from '@/lib/translations';
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
            <p>{t({ ru: 'Категория не найдена', en: 'Category not found', tr: 'Kategori bulunamadı', uk: 'Категорію не знайдено' }, locale)}</p>
            <Link href="/events" className={styles.backButton}>
              <ArrowLeft size={18} />
              {t({ ru: 'Вернуться к категориям', en: 'Back to Categories', tr: 'Kategorilere Dön', uk: 'Повернутися до категорій' }, locale)}
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
          {(locale === 'ru' ? category.title.ru : locale === 'tr' ? (category.title.tr || category.title.en) : locale === 'uk' ? (category.title.uk || category.title.ru) : category.title.en) + ' - Estedilux Med'}
        </title>
        <meta
          name="description"
          content={locale === 'ru' ? category.description.ru : locale === 'tr' ? (category.description.tr || category.description.en) : locale === 'uk' ? (category.description.uk || category.description.ru) : category.description.en}
        />
      </Head>

      <div className={styles.categoryPage}>
        <Header />
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroBackground}>
              <Image
                src="/directions_hero.jpg"
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
                    {t({ ru: 'Направления обучения и стажировок', en: 'Training and Internship Directions', tr: 'Eğitim ve Staj Yönleri', uk: 'Напрямки навчання та стажувань' }, locale)}
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
                  {locale === 'ru' ? category.title.ru : locale === 'tr' ? (category.title.tr || category.title.en) : locale === 'uk' ? (category.title.uk || category.title.ru) : category.title.en}
                </h2>
                <p className={styles.categoryDescription}>
                  {locale === 'ru' ? category.description.ru : locale === 'tr' ? (category.description.tr || category.description.en) : locale === 'uk' ? (category.description.uk || category.description.ru) : category.description.en}
                </p>
              </div>

              {/* Content Grid with Capabilities on the left and Events on the right */}
              <div className={styles.contentGrid}>
                {/* Left Column - Capabilities */}
                <div className={styles.capabilitiesColumn}>
                  <h3 className={styles.capabilitiesTitle}>
                    {t({ ru: 'Наши возможности', en: 'Our Capabilities', tr: 'Olanaklarımız', uk: 'Наші можливості' }, locale)}
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
                          {locale === 'ru' ? subcategory.ru : locale === 'tr' ? (subcategory.tr || subcategory.en) : locale === 'uk' ? (subcategory.uk || subcategory.ru) : subcategory.en}
                        </h4>
                        <ul className={styles.capabilityList}>
                          {subcategory.description ? (
                            <li className={styles.capabilityItem}>
                              {locale === 'ru' ? subcategory.description.ru : locale === 'tr' ? (subcategory.description.tr || subcategory.description.en) : locale === 'uk' ? (subcategory.description.uk || subcategory.description.ru) : subcategory.description.en}
                            </li>
                          ) : (
                            <>
                              <li className={styles.capabilityItem}>
                                {t({ ru: 'Теоретическая подготовка и практические занятия', en: 'Theoretical training and practical sessions', tr: 'Teorik eğitim ve pratik oturumlar', uk: 'Теоретична підготовка та практичні заняття' }, locale)}
                              </li>
                              <li className={styles.capabilityItem}>
                                {t({ ru: 'Руководство опытных специалистов', en: 'Guidance from experienced specialists', tr: 'Deneyimli uzmanlardan rehberlik', uk: 'Керівництво досвідчених спеціалістів' }, locale)}
                              </li>
                              <li className={styles.capabilityItem}>
                                {t({ ru: 'Международные стандарты обучения', en: 'International training standards', tr: 'Uluslararası eğitim standartları', uk: 'Міжнародні стандарти навчання' }, locale)}
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
                    {t({ ru: 'Предстоящие программы', en: 'Upcoming Programs', tr: 'Yaklaşan Programlar', uk: 'Майбутні програми' }, locale)}
                  </h2>
                  
                  {categoryEvents.length > 0 ? (
                    <div className={styles.eventsList}>
                      {categoryEvents.map((event) => (
                        <div key={event.id} className={styles.eventCard}>
                          {event.image && (
                            <div className={styles.eventImageWrapper}>
                              <Image
                                src={event.image}
                                alt={locale === 'ru' ? event.title.ru : locale === 'tr' ? (event.title.tr || event.title.en) : locale === 'uk' ? (event.title.uk || event.title.ru) : event.title.en}
                                fill
                                className={styles.eventImage}
                              />
                              {event.date && (
                                <div className={styles.eventDateBadge}>
                                  <Calendar size={14} />
                                  <span>
                                    {new Date(event.date).toLocaleDateString(
                                      locale === 'ru' ? 'ru-RU' : locale === 'tr' ? 'tr-TR' : locale === 'uk' ? 'uk-UA' : 'en-US',
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
                              {locale === 'ru' ? event.title.ru : locale === 'tr' ? (event.title.tr || event.title.en) : locale === 'uk' ? (event.title.uk || event.title.ru) : event.title.en}
                            </h3>
                            {event.location && (() => {
                              const locationText = locale === 'ru' ? event.location.ru : locale === 'tr' ? (event.location.tr || event.location.en) : locale === 'uk' ? (event.location.uk || event.location.ru) : event.location.en;
                              const countryInfo = getCountryFromLocation(locationText);
                              return (
                                <div className={styles.eventLocation}>
                                  {countryInfo && <span className={styles.countryFlag}>{countryInfo.emoji}</span>}
                                  <MapPin size={14} />
                                  <span>{locationText}</span>
                                </div>
                              );
                            })()}
                            {event.description && (
                              <p className={styles.eventDescription}>
                                {locale === 'ru' ? event.description.ru : locale === 'tr' ? (event.description.tr || event.description.en) : locale === 'uk' ? (event.description.uk || event.description.ru) : event.description.en}
                              </p>
                            )}
                            <Link href={`/event/${event.id}`} className={styles.eventButton}>
                              <span>{t({ ru: 'Регистрация', en: 'Registration', tr: 'Kayıt', uk: 'Реєстрація' }, locale)}</span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.eventsPlaceholder}>
                      <p className={styles.placeholderText}>
                        {t(
                          {
                            ru: 'Скоро здесь появятся запланированные события и мероприятия',
                            en: 'Upcoming events and activities will appear here soon',
                            tr: 'Yakında burada planlanan etkinlikler ve faaliyetler görünecek',
                            uk: 'Незабаром тут з\'являться заплановані події та заходи',
                          },
                          locale
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Section */}
              <section className={styles.contactSection}>
                <h3 className={styles.contactTitle}>
                  {t({ ru: 'Остались вопросы?', en: 'Have any questions?', tr: 'Sorularınız mı var?', uk: 'Залишилися питання?' }, locale)}
                </h3>
                <p className={styles.contactText}>
                  {t(
                    {
                      ru: 'Пишите нашему менеджеру, и мы с радостью ответим на все ваши вопросы',
                      en: 'Write to our manager, and we will be happy to answer all your questions',
                      tr: 'Yöneticimize yazın, tüm sorularınızı memnuniyetle yanıtlayacağız',
                      uk: 'Пишіть нашому менеджеру, і ми з радістю відповімо на всі ваші запитання',
                    },
                    locale
                  )}
                </p>
                <Link href="/contact" className={styles.contactButton}>
                  <span>{t({ ru: 'Связаться с нами', en: 'Contact Us', tr: 'Bizimle İletişime Geçin', uk: 'Зв\'язатися з нами' }, locale)}</span>
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
        ...(categoryData.title_tr ? { tr: categoryData.title_tr } : {}),
        ...(categoryData.title_uk ? { uk: categoryData.title_uk } : {}),
      },
      description: {
        ru: categoryData.description_ru,
        en: categoryData.description_en,
        ...(categoryData.description_tr ? { tr: categoryData.description_tr } : {}),
        ...(categoryData.description_uk ? { uk: categoryData.description_uk } : {}),
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
        ...(event.title_tr ? { tr: event.title_tr } : {}),
        ...(event.title_uk ? { uk: event.title_uk } : {}),
      },
      ...(event.description_ru || event.description_en ? {
        description: {
          ru: event.description_ru || '',
          en: event.description_en || '',
          ...(event.description_tr ? { tr: event.description_tr } : {}),
          ...(event.description_uk ? { uk: event.description_uk } : {}),
        }
      } : {}),
      ...(event.date ? { date: event.date } : {}),
      ...(event.end_date ? { endDate: event.end_date } : {}),
      ...(event.location_ru || event.location_en ? {
        location: {
          ru: event.location_ru || '',
          en: event.location_en || '',
          ...(event.location_tr ? { tr: event.location_tr } : {}),
          ...(event.location_uk ? { uk: event.location_uk } : {}),
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

