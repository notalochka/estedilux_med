import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Calendar, MapPin, DollarSign, X } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getImageUrl } from '@/lib/imageUtils';
import type { Event } from '@/types/events';
import styles from './EventDetail.module.css';

interface EventDetailPageProps {
  event: Event;
}

interface RegistrationFormData {
  name: string;
  phone: string;
  email: string;
  specialty?: string;
  paymentType: 'prepayment' | 'full';
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
    specialty: '',
    paymentType: 'prepayment',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

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

  const handlePayment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, paymentType: e.target.value as 'prepayment' | 'full' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    if (!event.price) {
      setError(locale === 'ru' ? 'Событие не имеет цены' : 'Event has no price');
      setIsSubmitting(false);
      return;
    }

    try {
      // Розраховуємо суму залежно від типу оплати
      const amount = formData.paymentType === 'prepayment' 
        ? event.price * 0.3  // 30% передоплата
        : event.price;        // 100% повна оплата

      // Створюємо платіж
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
          eventTitle: title,
          price: amount,
          userName: formData.name,
          userPhone: formData.phone,
          userEmail: formData.email,
          specialty: formData.specialty,
          paymentType: formData.paymentType,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || (locale === 'ru' ? 'Ошибка создания платежа' : 'Payment creation error'));
      }

      // Створюємо форму для WayForPay
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://secure.wayforpay.com/pay';
      form.target = '_self';

      // Додаємо всі поля з даних WayForPay
      Object.keys(result.data).forEach((key) => {
        const value = result.data[key];
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        
        // WayForPay очікує масиви як рядки через крапку з комою
        if (Array.isArray(value)) {
          input.value = value.join(';');
        } else {
          input.value = String(value);
        }
        
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || (locale === 'ru' ? 'Ошибка при создании платежа. Попробуйте позже.' : 'Error creating payment. Please try again later.'));
      setIsSubmitting(false);
    }
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
              {event.image ? (
                <Image
                  src={getImageUrl(event.image)}
                  alt={title}
                  fill
                  className={styles.heroBannerImage}
                  priority
                  quality={90}
                />
              ) : (
                <Image
                  src="/hero_background.jpg"
                  alt="Estedilux Med Background"
                  fill
                  className={styles.heroBannerImage}
                  priority
                  quality={90}
                />
              )}
              <div className={styles.heroOverlay}></div>
            </div>
            <div className={styles.container}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  {title}
                </h1>
              </div>
            </div>
          </section>

          {/* Event Content */}
          <div className={styles.contentSection}>
            <div className={styles.container}>
              {/* Event Info Grid */}
              <div className={styles.eventInfoGrid}>
                {/* Main Content */}
                <div className={styles.mainContent}>
                  {/* Event Image */}
                  {event.image && (
                    <div className={styles.imageWrapper}>
                      <Image
                        src={getImageUrl(event.image)}
                        alt={title}
                        width={800}
                        height={500}
                        className={styles.eventImage}
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  )}

                  {/* Description */}
                  {description && (
                    <div className={styles.descriptionSection}>
                      <h3 className={styles.descriptionTitle}>
                        {locale === 'ru' ? 'Описание программы' : 'Program Description'}
                      </h3>
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
                  <label htmlFor="reg-specialty" className={styles.formLabel}>
                    {locale === 'ru' ? 'Ваша специальность' : 'Your specialty'}
                  </label>
                  <input
                    type="text"
                    id="reg-specialty"
                    name="specialty"
                    value={formData.specialty || ''}
                    onChange={handleChange}
                    placeholder={locale === 'ru' ? 'Введите вашу специальность (необязательно)' : 'Enter your specialty (optional)'}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    {locale === 'ru' ? 'Тип оплаты' : 'Payment Type'} *
                  </label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="paymentType"
                        value="prepayment"
                        checked={formData.paymentType === 'prepayment'}
                        onChange={handlePaymentTypeChange}
                        className={styles.radioInput}
                      />
                      <span>
                        {locale === 'ru' ? 'Предоплата (30%)' : 'Prepayment (30%)'}
                        {event.price && (
                          <span className={styles.priceHint}>
                            {' - '}
                            {new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 2,
                            }).format(event.price * 0.3)}
                          </span>
                        )}
                      </span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="paymentType"
                        value="full"
                        checked={formData.paymentType === 'full'}
                        onChange={handlePaymentTypeChange}
                        className={styles.radioInput}
                      />
                      <span>
                        {locale === 'ru' ? 'Полная оплата' : 'Full Payment'}
                        {event.price && (
                          <span className={styles.priceHint}>
                            {' - '}
                            {formatPrice(event.price)}
                          </span>
                        )}
                      </span>
                    </label>
                  </div>
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

                {error && (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                )}

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

