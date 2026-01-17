import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Calendar, MapPin, DollarSign, X } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getImageUrl } from '@/lib/imageUtils';
import { getCountryFromLocation } from '@/lib/countryUtils';
import { t } from '@/lib/translations';
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
      setError(t({ ru: 'Событие не имеет цены', en: 'Event has no price', tr: 'Etkinliğin fiyatı yok', uk: 'Подія не має ціни' }, locale));
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
        throw new Error(result.error || t({ ru: 'Ошибка создания платежа', en: 'Payment creation error', tr: 'Ödeme oluşturma hatası', uk: 'Помилка створення платежу' }, locale));
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
      setError(err.message || t({ ru: 'Ошибка при создании платежа. Попробуйте позже.', en: 'Error creating payment. Please try again later.', tr: 'Ödeme oluşturulurken hata. Lütfen daha sonra tekrar deneyin.', uk: 'Помилка при створенні платежу. Спробуйте пізніше.' }, locale));
      setIsSubmitting(false);
    }
  };

  const title = locale === 'ru' ? event.title.ru : locale === 'tr' ? (event.title.tr || event.title.en) : locale === 'uk' ? (event.title.uk || event.title.ru) : event.title.en;
  const description = event.description 
    ? (locale === 'ru' ? event.description.ru : locale === 'tr' ? (event.description.tr || event.description.en) : locale === 'uk' ? (event.description.uk || event.description.ru) : event.description.en)
    : '';
  const location = event.location 
    ? (locale === 'ru' ? event.location.ru : locale === 'tr' ? (event.location.tr || event.location.en) : locale === 'uk' ? (event.location.uk || event.location.ru) : event.location.en)
    : '';

  const formatDate = (dateString?: string, endDateString?: string) => {
    if (!dateString) return '';
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
    const year = date.getFullYear();
    
    if (endDateString) {
      const endDate = new Date(endDateString);
      const endDay = endDate.getDate();
      const endMonth = months[endDate.getMonth()];
      
      // Якщо місяці однакові, показуємо тільки один раз
      if (startMonth === endMonth) {
        return `${startDay} - ${endDay} ${startMonth}, ${year}`;
      } else {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${year}`;
      }
    }
    
    return `${startDay} ${startMonth}, ${year}`;
  };

  const countryInfo = location ? getCountryFromLocation(location) : null;

  const formatPrice = (price?: number) => {
    if (!price) return '';
    const localeMap = locale === 'ru' ? 'ru-RU' : locale === 'tr' ? 'tr-TR' : locale === 'uk' ? 'uk-UA' : 'en-US';
    return new Intl.NumberFormat(localeMap, {
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
          {title} - {t({ ru: 'События Estedilux Med', en: 'Events Estedilux Med', tr: 'Etkinlikler Estedilux Med', uk: 'Події Estedilux Med' }, locale)}
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
                  src="/main_hero.jpg"
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
                        {t({ ru: 'Описание программы', en: 'Program Description', tr: 'Program Açıklaması', uk: 'Опис програми' }, locale)}
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
                      {t({ ru: 'Детали события', en: 'Event Details', tr: 'Etkinlik Detayları', uk: 'Деталі події' }, locale)}
                    </h3>

                    {/* Date */}
                    {event.date && (
                      <div className={styles.detailItem}>
                        <Calendar size={20} className={styles.detailIcon} />
                        <div className={styles.detailContent}>
                          <span className={styles.detailLabel}>
                            {t({ ru: 'Дата', en: 'Date', tr: 'Tarih', uk: 'Дата' }, locale)}
                          </span>
                          <span className={styles.detailValue}>{formatDate(event.date, event.endDate)}</span>
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {location && (
                      <div className={styles.detailItem}>
                        <MapPin size={20} className={styles.detailIcon} />
                        <div className={styles.detailContent}>
                          <span className={styles.detailLabel}>
                            {t({ ru: 'Место проведения', en: 'Location', tr: 'Konum', uk: 'Місце проведення' }, locale)}
                          </span>
                          <span className={styles.detailValue}>
                            {countryInfo && <span className={styles.countryFlag}>{countryInfo.emoji}</span>}
                            {location}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Price */}
                    {event.price && (
                      <div className={styles.detailItem}>
                        <DollarSign size={20} className={styles.detailIcon} />
                        <div className={styles.detailContent}>
                          <span className={styles.detailLabel}>
                            {t({ ru: 'Стоимость', en: 'Price', tr: 'Fiyat', uk: 'Вартість' }, locale)}
                          </span>
                          <span className={styles.detailValue}>{formatPrice(event.price)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Button */}
                  {event.price && (
                    <button onClick={handlePayment} className={styles.paymentButton}>
                      {t({ ru: 'Записаться на событие', en: 'Register for the event', tr: 'Etkinliğe kayıt ol', uk: 'Записатися на подію' }, locale)}
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
                  {t({ ru: 'Регистрация на событие', en: 'Event Registration', tr: 'Etkinlik Kaydı', uk: 'Реєстрація на подію' }, locale)}
                </h2>
                <p className={styles.modalSubtitle}>
                  {t(
                    {
                      ru: 'Заполните форму, чтобы зарегистрироваться на событие',
                      en: 'Fill out the form to register for the event',
                      tr: 'Etkinliğe kayıt olmak için formu doldurun',
                      uk: 'Заповніть форму, щоб зареєструватися на подію',
                    },
                    locale
                  )}
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.registrationForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="reg-name" className={styles.formLabel}>
                    {t({ ru: 'Ваши ФИО', en: 'Your Full Name', tr: 'Adınız Soyadınız', uk: 'Ваше ПІБ' }, locale)} *
                  </label>
                  <input
                    type="text"
                    id="reg-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t({ ru: 'Введите ваше имя', en: 'Enter your name', tr: 'Adınızı girin', uk: 'Введіть ваше ім\'я' }, locale)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="reg-phone" className={styles.formLabel}>
                    {t({ ru: 'Телефон', en: 'Phone', tr: 'Telefon', uk: 'Телефон' }, locale)} *
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
                    {t({ ru: 'Ваша специальность', en: 'Your specialty', tr: 'Uzmanlığınız', uk: 'Ваша спеціальність' }, locale)}
                  </label>
                  <input
                    type="text"
                    id="reg-specialty"
                    name="specialty"
                    value={formData.specialty || ''}
                    onChange={handleChange}
                    placeholder={t({ ru: 'Введите вашу специальность (необязательно)', en: 'Enter your specialty (optional)', tr: 'Uzmanlığınızı girin (isteğe bağlı)', uk: 'Введіть вашу спеціальність (необов\'язково)' }, locale)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    {t({ ru: 'Тип оплаты', en: 'Payment Type', tr: 'Ödeme Türü', uk: 'Тип оплати' }, locale)} *
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
                        {t({ ru: 'Предоплата (30%)', en: 'Prepayment (30%)', tr: 'Ön Ödeme (%30)', uk: 'Передоплата (30%)' }, locale)}
                        {event.price && (
                          <span className={styles.priceHint}>
                            {' - '}
                            {new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : locale === 'tr' ? 'tr-TR' : locale === 'uk' ? 'uk-UA' : 'en-US', {
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
                        {t({ ru: 'Полная оплата', en: 'Full Payment', tr: 'Tam Ödeme', uk: 'Повна оплата' }, locale)}
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
                    {t({ ru: 'Дополнительная информация', en: 'Additional Information', tr: 'Ek Bilgiler', uk: 'Додаткова інформація' }, locale)}
                  </label>
                  <textarea
                    id="reg-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t({ ru: 'Ваши вопросы или комментарии (необязательно)', en: 'Your questions or comments (optional)', tr: 'Sorularınız veya yorumlarınız (isteğe bağlı)', uk: 'Ваші запитання або коментарі (необов\'язково)' }, locale)}
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
                    {t({ ru: 'Отмена', en: 'Cancel', tr: 'İptal', uk: 'Скасувати' }, locale)}
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t({ ru: 'Отправка...', en: 'Submitting...', tr: 'Gönderiliyor...', uk: 'Відправка...' }, locale)
                      : t({ ru: 'Продолжить к оплате', en: 'Continue to Payment', tr: 'Ödemeye Devam Et', uk: 'Продовжити до оплати' }, locale)}
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
        ...(eventData.title_tr ? { tr: eventData.title_tr } : {}),
        ...(eventData.title_uk ? { uk: eventData.title_uk } : {}),
      },
      ...(eventData.description_ru || eventData.description_en ? {
        description: {
          ru: eventData.description_ru || '',
          en: eventData.description_en || '',
          ...(eventData.description_tr ? { tr: eventData.description_tr } : {}),
          ...(eventData.description_uk ? { uk: eventData.description_uk } : {}),
        }
      } : {}),
      ...(eventData.date ? { date: eventData.date } : {}),
      ...(eventData.end_date ? { endDate: eventData.end_date } : {}),
      ...(eventData.location_ru || eventData.location_en ? {
        location: {
          ru: eventData.location_ru || '',
          en: eventData.location_en || '',
          ...(eventData.location_tr ? { tr: eventData.location_tr } : {}),
          ...(eventData.location_uk ? { uk: eventData.location_uk } : {}),
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

