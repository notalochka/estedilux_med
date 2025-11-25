import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { ContactFormData } from '@/types/index';
import styles from './Contact.module.css';

const Contact: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Тут буде логіка відправки форми (поки що просто симуляція)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>
          {locale === 'ru' ? 'Контакты - Estedilux Med' : 'Contact - Estedilux Med'}
        </title>
        <meta
          name="description"
          content={
            locale === 'ru'
              ? 'Свяжитесь с нами для получения дополнительной информации'
              : 'Contact us for more information'
          }
        />
      </Head>

      <div className={styles.contactPage}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.hero}>
              <h1 className={styles.title}>
                {locale === 'ru' ? 'Свяжитесь с нами' : 'Contact Us'}
              </h1>
              <p className={styles.subtitle}>
                {locale === 'ru'
                  ? 'Заполните форму ниже, и мы свяжемся с вами в ближайшее время'
                  : 'Fill out the form below and we will contact you soon'}
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                {locale === 'ru'
                  ? 'Спасибо! Ваше сообщение отправлено.'
                  : 'Thank you! Your message has been sent.'}
              </div>
            )}

            <div className={styles.formWrapper}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    <svg className={styles.labelIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {locale === 'ru' ? 'Имя' : 'Name'}
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={locale === 'ru' ? 'Введите ваше имя' : 'Enter your name'}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    <svg className={styles.labelIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={locale === 'ru' ? 'your.email@example.com' : 'your.email@example.com'}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    <svg className={styles.labelIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {locale === 'ru' ? 'Телефон' : 'Phone'}
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={locale === 'ru' ? '+380 50 123 45 67' : '+1 234 567 8900'}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    <svg className={styles.labelIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {locale === 'ru' ? 'Сообщение' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={locale === 'ru' ? 'Расскажите нам о вашем запросе...' : 'Tell us about your request...'}
                    className={styles.textarea}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting
                    ? locale === 'ru'
                      ? 'Отправка...'
                      : 'Sending...'
                    : locale === 'ru'
                    ? 'Отправить сообщение'
                    : 'Send Message'}
                </button>
              </form>
            </div>

            <div className={styles.contactInfo}>
              <h3 className={styles.contactInfoTitle}>
                {locale === 'ru' ? 'Другие способы связи' : 'Other Ways to Contact Us'}
              </h3>
              <div className={styles.contactInfoGrid}>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className={styles.contactInfoText}>
                    <a href="mailto:estediluxmed@ukr.net" style={{ color: 'inherit', textDecoration: 'none' }}>
                      estediluxmed@ukr.net
                    </a>
                  </div>
                </div>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className={styles.contactInfoText}>
                    <a href="tel:+380509994349" style={{ color: 'inherit', textDecoration: 'none' }}>
                      +380 50 999 43 49
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;

