import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Calendar, MapPin, ShoppingCart } from 'lucide-react';
import { useAnimation } from '@/lib/useAnimation';
import type { Event, EventCategory } from '@/types/events';
import styles from './UpcomingEvents.module.css';

const UpcomingEvents: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hooks must be called at the top level
  const { ref: titleRef, isVisible: titleVisible } = useAnimation({ threshold: 0.1 });
  const event1Ref = useAnimation({ threshold: 0.1 });
  const event2Ref = useAnimation({ threshold: 0.1 });
  const event3Ref = useAnimation({ threshold: 0.1 });
  const eventRefs = [event1Ref, event2Ref, event3Ref];

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

  const upcomingEvents = React.useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Скидаємо час для порівняння тільки дат

    return events
      .filter((event) => {
        // Фільтруємо тільки опубліковані події
        if (event.published === false) return false;
        
        if (!event.date) return false;
        try {
          const eventDate = new Date(event.date);
          if (isNaN(eventDate.getTime())) return false;
          eventDate.setHours(0, 0, 0, 0);
          // Фільтруємо тільки майбутні події (включно з сьогоднішніми)
          return eventDate >= now;
        } catch {
          return false;
        }
      })
      .sort((a, b) => {
        if (!a.date || !b.date) {
          // Якщо одна з дат відсутня, ставимо її в кінець
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
        }

        try {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          
          // Перевірка на валідність дат
          if (isNaN(dateA) || isNaN(dateB)) {
            // Якщо дати невалідні, сортуємо за id
            return a.id - b.id;
          }
          
          // Сортуємо за датою (від найближчої до найдальшої)
          const dateDiff = dateA - dateB;
          // Якщо дати однакові, сортуємо за id
          return dateDiff !== 0 ? dateDiff : a.id - b.id;
        } catch {
          // У разі помилки сортуємо за id
          return a.id - b.id;
        }
      })
      .slice(0, 3);
  }, [events]);

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

  if (isLoading || upcomingEvents.length === 0) {
    return null;
  }

  return (
    <section className={styles.upcomingEvents}>
      <div className={styles.container}>
        <h2 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className={`${styles.title} ${titleVisible ? styles.animateFadeInUp : ''}`}
        >
          {locale === 'ru' ? 'Предстоящие программы' : 'Upcoming Programs'}
        </h2>
        
        <div className={styles.eventsGrid}>
          {upcomingEvents.map((event, index) => {
            const categoryTitle = getCategoryTitle(event.categoryId);
            const { ref, isVisible } = eventRefs[index] || { ref: null, isVisible: false };
            
            return (
              <article 
                key={event.id} 
                ref={ref as React.RefObject<HTMLElement>}
                className={`${styles.eventCard} ${isVisible ? styles.animateFadeInUp : ''}`}
                style={{ animationDelay: `${index * 0.15}s`, opacity: isVisible ? 1 : 0 }}
              >
                <Link href={`/event/${event.id}`} className={styles.eventLink}>
                  <div className={styles.imageWrapper}>
                    {event.image && (
                      <Image
                        src={event.image}
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
      </div>
    </section>
  );
};

export default UpcomingEvents;

