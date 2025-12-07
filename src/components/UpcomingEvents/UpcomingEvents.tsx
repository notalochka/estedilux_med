import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Calendar, MapPin, ShoppingCart } from 'lucide-react';
import { events } from '@/data/events';
import { eventCategories } from '@/data/eventCategories';
import type { Event } from '@/types/events';
import styles from './UpcomingEvents.module.css';

const UpcomingEvents: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  // Сортуємо події за датою та беремо найближчі 3
  const upcomingEvents = events
    .filter((event) => event.date)
    .sort((a, b) => {
      const dateA = new Date(a.date || '').getTime();
      const dateB = new Date(b.date || '').getTime();
      return dateA - dateB;
    })
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = locale === 'ru' 
      ? ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getCategoryTitle = (categoryId: string) => {
    const category = eventCategories.find((cat) => cat.id === categoryId);
    return category 
      ? (locale === 'ru' ? category.title.ru : category.title.en)
      : '';
  };

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <section className={styles.upcomingEvents}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {locale === 'ru' ? 'Предстоящие программы' : 'Upcoming Programs'}
        </h2>
        
        <div className={styles.eventsGrid}>
          {upcomingEvents.map((event) => {
            const categoryTitle = getCategoryTitle(event.categoryId);
            
            return (
              <article key={event.id} className={styles.eventCard}>
                <Link href={`/events/${event.categoryId}#${event.id}`} className={styles.eventLink}>
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

