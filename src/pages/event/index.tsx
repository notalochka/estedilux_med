import React, { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Calendar, MapPin, ShoppingCart, X } from 'lucide-react';
import { useAnimation } from '@/lib/useAnimation';
import { getImageUrl } from '@/lib/imageUtils';
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = locale === 'ru' 
      ? ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getCategoryTitle = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category 
      ? (locale === 'ru' ? category.title.ru : category.title.en)
      : '';
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
          {locale === 'ru' ? 'События - Estedilux Med' : 'Events - Estedilux Med'}
        </title>
        <meta
          name="description"
          content={
            locale === 'ru'
              ? 'Все события и мероприятия Estedilux Med'
              : 'All events and activities Estedilux Med'
          }
        />
      </Head>

      <div className={styles.eventPage}>
        <Header />
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroBackground}>
              <Image
                src="/photo1.jpg"
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
                    {locale === 'ru' ? 'События' : 'Events'}
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
                        ? `События на ${selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}`
                        : `Events on ${selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
                      : locale === 'ru'
                      ? 'Все события Estedilux\u00A0Med'
                      : 'All Events Estedilux\u00A0Med'}
                  </h2>
                  <p className={styles.eventsCount}>
                  {locale === 'ru' ? 'Всего событий:' : 'Total events:'} {filteredEvents.length}
                  </p>
                </div>
              )}

              <div className={styles.contentGrid}>
                {/* Events Grid */}
                <div>
                  {isLoading ? (
                    <div className={styles.loading}>
                      {locale === 'ru' ? 'Загрузка событий...' : 'Loading events...'}
                    </div>
                  ) : filteredEvents.length === 0 ? (
                    <div className={styles.noEvents}>
                      <p>{locale === 'ru' ? 'События не найдены' : 'No events found'}</p>
                    </div>
                  ) : (
                    <div className={styles.eventsGrid}>
                        {filteredEvents.map((event, index) => {
                          const categoryTitle = getCategoryTitle(event.categoryId);
                          const isLastOdd = filteredEvents.length % 2 !== 0 && index === filteredEvents.length - 1;
                          return (
                            <article key={event.id} className={`${styles.eventCard} ${isLastOdd ? styles.eventCardWide : ''}`}>
                              <Link href={`/event/${event.id}`} className={styles.eventLink}>
                                <div className={styles.imageWrapper}>
                                  {event.image && (
                                    <Image
                                      src={getImageUrl(event.image)}
                                      alt={locale === 'ru' ? event.title.ru : event.title.en}
                                      fill
                                      className={styles.eventImage}
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                  )}
                                  {event.date && (
                                    <div className={styles.dateBadge}>
                                      <Calendar size={14} />
                                      <span>{formatDate(event.date)}</span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className={styles.eventContent}>
                                  {categoryTitle && (
                                    <div className={styles.category}>
                                      {categoryTitle}
                                    </div>
                                  )}
                                  
                                  <h3 className={styles.eventTitle}>
                                    {locale === 'ru' ? event.title.ru : event.title.en}
                                  </h3>
                                  
                                  {event.location && (
                                    <div className={styles.location}>
                                      <MapPin size={14} />
                                      <span>{locale === 'ru' ? event.location.ru : event.location.en}</span>
                                    </div>
                                  )}
                                  
                                  <div className={styles.registrationButton}>
                                    <ShoppingCart size={16} />
                                    <span>{locale === 'ru' ? 'Регистрация' : 'Registration'}</span>
                                  </div>
                                </div>
                              </Link>
                            </article>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* Calendar Sidebar */}
                <aside className={styles.calendarSidebar}>
                  <EventsCalendar
                    events={events}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                  {selectedDate && (
                    <button onClick={clearFilter} className={styles.clearFilter}>
                      <X size={16} />
                      <span>{locale === 'ru' ? 'Очистить фильтр' : 'Clear filter'}</span>
                    </button>
                  )}
                </aside>
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

