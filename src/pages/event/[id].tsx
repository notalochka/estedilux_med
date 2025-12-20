import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeft, Calendar, MapPin, DollarSign, X } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { Event } from '@/types/events';
import styles from './EventDetail.module.css';

interface EventDetailPageProps {
  event: Event;
}

interface RegistrationFormData {
  name: string;
  phone: string;
  email: string;
  message?: string;
}

const EventDetailPage: NextPage<EventDetailPageProps> = ({ event }) => {
  const router = useRouter();
  const { locale } = router;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Блокування прокрутки при відкритті модального вікна
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleBack = () => {
    router.push('/events', '/events', { locale });
  };

  const handlePayment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Тут буде логіка відправки форми
    // Наприклад, API запит або перенаправлення на платіжний шлюз
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert(locale === 'ru' ? 'Форма отправлена! Переход на страницу оплаты...' : 'Form submitted! Redirecting to payment...');
      setIsModalOpen(false);
      // Тут можна додати логіку переходу на оплату
    }, 1000);
  };

  const title = locale === 'ru' ? event.title.ru : event.title.en;
  const description = event.description 
    ? (locale === 'ru' ? event.description.ru : event.description.en)
    : '';
  const location = event.location 
    ? (locale === 'ru' ? event.location.ru : event.location.en)
    : '';

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = locale === 'ru' 
      ? ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

  const formatPrice = (price?: number) => {
    if (!price) return '';
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <>
      <Head>
        <title>
          {title} - {locale === 'ru' ? 'События Estedilux Med' : 'Events Estedilux Med'}
        </title>
        <meta
          name="description"
          content={description || title}
        />
      </Head>

      <div className={styles.eventDetailPage}>
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

          {/* Event Content */}
          <div className={styles.contentSection}>
            <div className={styles.container}>
              {/* Back Button */}
              <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeft size={20} />
                <span>{locale === 'ru' ? 'Вернуться к событиям' : 'Back to events'}</span>
              </button>

              {/* Event Info Grid */}
              <div className={styles.eventInfoGrid}>
                {/* Main Content */}
                <div className={styles.mainContent}>
                  {/* Title */}
                  <div className={styles.descriptionSection}>
                    <h2 className={styles.sectionTitle}>
                      {title}
                    </h2>
                  </div>

                  {/* Event Image */}
                  {event.image && (
                    <div className={styles.imageWrapper}>
                      <Image
                        src={event.image}
                        alt={title}
                        width={400}
                        height={250}
                        className={styles.eventImage}
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  )}

                  {/* Description */}
                  {description && (
                    <div className={styles.descriptionSection}>
                      <p className={styles.description}>{description}</p>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className={styles.sidebar}>
                  {/* Event Details Card */}
                  <div className={styles.detailsCard}>
                    <h3 className={styles.detailsCardTitle}>
                      {locale === 'ru' ? 'Детали события' : 'Event Details'}
                    </h3>

                    {/* Date */}
                    {event.date && (
                      <div className={styles.detailItem}>
                        <Calendar size={20} className={styles.detailIcon} />
                        <div className={styles.detailContent}>
                          <span className={styles.detailLabel}>
                            {locale === 'ru' ? 'Дата' : 'Date'}
                          </span>
                          <span className={styles.detailValue}>{formatDate(event.date)}</span>
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {location && (
                      <div className={styles.detailItem}>
                        <MapPin size={20} className={styles.detailIcon} />
                        <div className={styles.detailContent}>
                          <span className={styles.detailLabel}>
                            {locale === 'ru' ? 'Место проведения' : 'Location'}
                          </span>
                          <span className={styles.detailValue}>{location}</span>
                        </div>
                      </div>
                    )}

                    {/* Price */}
                    {event.price && (
                      <div className={styles.detailItem}>
                        <DollarSign size={20} className={styles.detailIcon} />
                        <div className={styles.detailContent}>
                          <span className={styles.detailLabel}>
                            {locale === 'ru' ? 'Стоимость' : 'Price'}
                          </span>
                          <span className={styles.detailValue}>{formatPrice(event.price)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Button */}
                  {event.price && (
                    <button onClick={handlePayment} className={styles.paymentButton}>
                      {locale === 'ru' ? 'Записаться на событие' : 'Register for the event'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />

        {/* Registration Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalCloseButton} onClick={handleCloseModal} aria-label="Close">
                <X size={24} />
              </button>
              
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  {locale === 'ru' ? 'Регистрация на событие' : 'Event Registration'}
                </h2>
                <p className={styles.modalSubtitle}>
                  {locale === 'ru' 
                    ? 'Заполните форму, чтобы зарегистрироваться на событие'
                    : 'Fill out the form to register for the event'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.registrationForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="reg-name" className={styles.formLabel}>
                    {locale === 'ru' ? 'Ваши ФИО' : 'Your Full Name'} *
                  </label>
                  <input
                    type="text"
                    id="reg-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={locale === 'ru' ? 'Введите ваше имя' : 'Enter your name'}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="reg-phone" className={styles.formLabel}>
                    {locale === 'ru' ? 'Телефон' : 'Phone'} *
                  </label>
                  <input
                    type="tel"
                    id="reg-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+380 (00) 000-00-00"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="reg-email" className={styles.formLabel}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="reg-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="reg-message" className={styles.formLabel}>
                    {locale === 'ru' ? 'Дополнительная информация' : 'Additional Information'}
                  </label>
                  <textarea
                    id="reg-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={locale === 'ru' ? 'Ваши вопросы или комментарии (необязательно)' : 'Your questions or comments (optional)'}
                    className={styles.formTextarea}
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className={styles.cancelButton}
                    disabled={isSubmitting}
                  >
                    {locale === 'ru' ? 'Отмена' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? (locale === 'ru' ? 'Отправка...' : 'Submitting...')
                      : (locale === 'ru' ? 'Продолжить к оплате' : 'Continue to Payment')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<EventDetailPageProps> = async ({ params }) => {
  try {
    const idParam = params?.id as string;
    const id = parseInt(idParam, 10);
    
    if (isNaN(id)) {
      return {
        notFound: true,
      };
    }
    
    const { getEventById } = await import('@/lib/db');
    const eventData = getEventById.get(id) as any;
    
    if (!eventData) {
      return {
        notFound: true,
      };
    }
    
    // Перевіряємо, чи подія опублікована
    if (eventData.published !== 1) {
      return {
        notFound: true,
      };
    }
    
    const event: Event = {
      id: eventData.id,
      categoryId: eventData.category_id,
      title: {
        ru: eventData.title_ru,
        en: eventData.title_en,
      },
      ...(eventData.description_ru || eventData.description_en ? {
        description: {
          ru: eventData.description_ru || '',
          en: eventData.description_en || '',
        }
      } : {}),
      ...(eventData.date ? { date: eventData.date } : {}),
      ...(eventData.location_ru || eventData.location_en ? {
        location: {
          ru: eventData.location_ru || '',
          en: eventData.location_en || '',
        }
      } : {}),
      ...(eventData.price !== null && eventData.price !== undefined ? { price: eventData.price } : {}),
      ...(eventData.duration ? { duration: eventData.duration } : {}),
      ...(eventData.image ? { image: eventData.image } : {}),
    };

    return {
      props: {
        event,
      },
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    return {
      notFound: true,
    };
  }
};

export default EventDetailPage;

