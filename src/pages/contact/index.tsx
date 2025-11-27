import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { ContactFormData } from '@/types/index';
import styles from './Contact.module.css';

const Contact: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToContactForm = () => {
    const element = document.getElementById('contact-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }));
  };

  const handleContactTypeChange = (type: 'phone' | 'email') => {
    setContactType(type);
    // Очищаємо поле, яке не використовується
    if (type === 'phone') {
      setFormData((prev) => ({ ...prev, email: '', phone: '' }));
    } else {
      setFormData((prev) => ({ ...prev, phone: '', email: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Валідація: перевіряємо наявність телефону або email
    if (contactType === 'phone' && !formData.phone) {
      setSubmitStatus('error');
      return;
    }
    if (contactType === 'email' && !formData.email) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Тут буде логіка відправки форми (поки що просто симуляція)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
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
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroBackground}>
              <Image
                src="/photo5.jpg"
                alt="Estedilux Med Background"
                fill
                className={styles.heroBannerImage}
                priority
                quality={90}
              />
              <div className={styles.heroOverlay}></div>
            </div>
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <div className={styles.heroTitleWrapper}>
                  <h1 className={styles.heroTitle}>
                    {locale === 'ru' ? 'Связаться с нами' : 'Contact Us'}
                  </h1>
                  <div className={styles.heroChevron} onClick={scrollToContactForm}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="contact-form-section" className={styles.container}>
            <div className={styles.contentGrid}>
              <div className={styles.formWrapper}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>
                  {locale === 'ru' ? ' Свяжитесь с командой Estedilux Med' : 'Contact the Estedilux Med team'}
                </h2>
                <p className={styles.formDescription}>
                  {locale === 'ru'
                    ? 'Если у вас есть вопросы, пожалуйста, заполните форму, и мы свяжемся с вами в ближайшее время.'
                    : 'If you have questions, please fill out the form, and we will contact you shortly.'}
                </p>
              </div>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    {locale === 'ru' ? 'Ваши ПІБ' : 'Your Full Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={locale === 'ru' ? 'Введите текст...' : 'Enter text...'}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    {locale === 'ru' ? 'Контакт' : 'Contact'}
                  </label>
                  <div className={styles.contactTypeSelector}>
                    <button
                      type="button"
                      onClick={() => handleContactTypeChange('phone')}
                      className={`${styles.contactTypeButton} ${
                        contactType === 'phone' ? styles.active : ''
                      }`}
                    >
                      {locale === 'ru' ? 'Телефон' : 'Phone'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleContactTypeChange('email')}
                      className={`${styles.contactTypeButton} ${
                        contactType === 'email' ? styles.active : ''
                      }`}
                    >
                      Email
                    </button>
                  </div>
                  {contactType === 'phone' ? (
                    <div className={styles.phoneInputWrapper}>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        required
                        placeholder='+380 (00) 000-00-00'
                        className={styles.phoneInput}
                      />
                    </div>
                  ) : (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      required
                      placeholder={locale === 'ru' ? 'your.email@example.com' : 'your.email@example.com'}
                      className={styles.input}
                    />
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    {locale === 'ru' ? 'Поставьте свой вопрос' : 'Ask Your Question'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={locale === 'ru' ? 'Введите текст...' : 'Enter text...'}
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
                    ? 'Надіслати'
                    : 'Send'}
                </button>
              </form>
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  {locale === 'ru'
                    ? 'Спасибо! Ваше сообщение отправлено.'
                    : 'Thank you! Your message has been sent.'}
                </div>
              )}
              </div>
              

              <div className={styles.imageWrapper}>
                <Image
                  src="/photo1.jpg"
                  alt={locale === 'ru' ? 'Estedilux Med' : 'Estedilux Med'}
                  fill
                  className={styles.contactImage}
                  quality={90}
                />
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

