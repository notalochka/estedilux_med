import React, { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Calendar, MapPin, ShoppingCart, X } from 'lucide-react';
import { useAnimation } from '@/lib/useAnimation';
import { getImageUrl } from '@/lib/imageUtils';
import { getCountryFromLocation } from '@/lib/countryUtils';
import { t } from '@/lib/translations';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import EventsCalendar from '@/components/EventsCalendar/EventsCalendar';
import type { Event, EventCategory } from '@/types/events';
import styles from './Event.module.css';

const Event: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const { ref: heroRef, isVisible: heroVisible } = useAnimation({ threshold: 0.2 });
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/events/categories'),
        ]);

        if (eventsResponse.ok && categoriesResponse.ok) {
          const eventsData: Event[] = await eventsResponse.json();
          const categoriesData: EventCategory[] = await categoriesResponse.json();
          setEvents(eventsData);
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error fetching events data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      if (event.published === false) return false;
      return true;
    });

    if (selectedDate) {
      filtered = filtered.filter((event) => {
        if (!event.date) return false;
        try {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate.getTime() === selectedDate.getTime();
        } catch {
          return false;
        }
      });
    }

    return filtered.sort((a, b) => {
      if (!a.date || !b.date) {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
      }
      try {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (isNaN(dateA) || isNaN(dateB)) {
          return a.id - b.id;
        }
        const dateDiff = dateA - dateB;
        return dateDiff !== 0 ? dateDiff : a.id - b.id;
      } catch {
        return a.id - b.id;
      }
    });
  }, [events, selectedDate]);

  const formatDate = (dateString: string, endDateString?: string) => {
    const date = new Date(dateString);
    const months = 
      locale === 'ru' 
        ? ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
        : locale === 'tr'
        ? ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
        : locale === 'uk'
        ? ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня']
        : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const startDay = date.getDate();
    const startMonth = months[date.getMonth()];
    
    if (endDateString) {
      const endDate = new Date(endDateString);
      const endDay = endDate.getDate();
      const endMonth = months[endDate.getMonth()];
      
      if (startMonth === endMonth) {
        return `${startDay} - ${endDay}\n${startMonth}`;
      } else {
        return `${startDay} ${startMonth} -\n${endDay} ${endMonth}`;
      }
    }
    
    return `${startDay}\n${startMonth}`;
  };

  const getCategoryTitle = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return '';
    
    if (locale === 'ru') return category.title.ru;
    if (locale === 'tr') return category.title.tr || category.title.en;
    if (locale === 'uk') return category.title.uk || category.title.ru;
    return category.title.en;
  };

  const scrollToContent = () => {
    const element = document.getElementById('content-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const clearFilter = () => {
    setSelectedDate(null);
  };

  return (
    <>
      <Head>
        <title>
          {t({ ru: 'События - Estedilux Med', en: 'Events - Estedilux Med', tr: 'Etkinlikler - Estedilux Med', uk: 'Події - Estedilux Med' }, locale)}
        </title>
        <meta
          name="description"
          content={t(
            {
              ru: 'Все события и мероприятия Estedilux Med',
              en: 'All events and activities Estedilux Med',
              tr: 'Estedilux Med\'in tüm etkinlikleri ve faaliyetleri',
              uk: 'Всі події та заходи Estedilux Med',
            },
            locale
          )}
        />
      </Head>

      <div className={styles.eventPage}>
        <Header />
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroBackground}>
              <Image
                src="/events_hero.jpg"
                alt="Estedilux Med Events Background"
                fill
                className={styles.heroBannerImage}
                priority
                quality={90}
              />
              <div className={styles.heroOverlay}></div>
            </div>
            <div className={styles.container}>
              <div className={styles.heroContent}>
                <div 
                  ref={heroRef as React.RefObject<HTMLDivElement>}
                  className={`${styles.heroTitleWrapper} ${heroVisible ? styles.animateFadeInUp : ''}`}
                >
                  <h1 className={styles.heroTitle}>
                    {t({ ru: 'События', en: 'Events', tr: 'Etkinlikler', uk: 'Події' }, locale)}
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

          {/* Content Section */}
          <div id="content-section" className={styles.contentSection}>
            <div className={styles.container}>
              {/* Events Header */}
              {!isLoading && (
                <div className={styles.eventsHeader}>
                  <h2 className={styles.eventsTitle}>
                    {selectedDate
                      ? locale === 'ru'
                        ? t({ ru: `События на ${selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}`, en: `Events on ${selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`, tr: `${selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} tarihindeki Etkinlikler`, uk: `Події на ${selectedDate.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}` }, locale)
                        : locale === 'tr'
                        ? `${selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} tarihindeki Etkinlikler`
                        : locale === 'uk'
                        ? `Події на ${selectedDate.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}`
                        : `Events on ${selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
                      : t({ ru: 'РАСПИСАНИЕ', en: 'SCHEDULE', tr: 'PROGRAM', uk: 'РОЗКЛАД' }, locale)}
                  </h2>
                  {!selectedDate && (
                    <>
                      <div className={styles.eventsSubtitle}>
                        <span>Estedilux Med</span>
                        <span className={styles.eventsYear}>2026</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className={styles.contentGrid}>
                {isLoading ? (
                  <div className={styles.loading}>
                    {t({ ru: 'Загрузка событий...', en: 'Loading events...', tr: 'Etkinlikler yükleniyor...', uk: 'Завантаження подій...' }, locale)}
                  </div>
                ) : filteredEvents.length === 0 ? (
                  <div className={styles.noEvents}>
                    <p>{t({ ru: 'События не найдены', en: 'No events found', tr: 'Etkinlik bulunamadı', uk: 'Події не знайдено' }, locale)}</p>
                  </div>
                ) : (
                  <>
                    <div className={styles.eventsGrid}>
                        {filteredEvents.map((event) => {
                          const eventTitle = locale === 'ru' ? event.title.ru : locale === 'tr' ? (event.title.tr || event.title.en) : locale === 'uk' ? (event.title.uk || event.title.ru) : event.title.en;
                          const locationText = event.location ? (locale === 'ru' ? event.location.ru : locale === 'tr' ? (event.location.tr || event.location.en) : locale === 'uk' ? (event.location.uk || event.location.ru) : event.location.en) : '';
                          const countryInfo = locationText ? getCountryFromLocation(locationText) : null;
                          
                          return (
                            <article key={event.id} className={styles.eventCard}>
                              <Link href={`/event/${event.id}`} className={styles.eventLink}>
                                <div className={styles.eventCardContent}>
                                  {event.date && (
                                    <div className={styles.eventDate}>
                                      {formatDate(event.date, event.endDate)}
                                    </div>
                                  )}
                                  
                                  <h3 className={styles.eventTitle}>
                                    {eventTitle}
                                  </h3>
                                  
                                  {countryInfo && (
                                    <div className={styles.eventFlag}>
                                      {countryInfo.emoji}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            </article>
                          );
                        })}
                    </div>
                    <div className={styles.eventsFooter}>
                      <p>{t({ ru: 'Международное медицинское образование', en: 'International Medical Education', tr: 'Uluslararası Tıp Eğitimi', uk: 'Міжнародна медична освіта' }, locale)}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Event;

