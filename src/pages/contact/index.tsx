import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useAnimation } from '@/lib/useAnimation';
import type { ContactFormData } from '@/types/index';
import styles from './Contact.module.css';

const Contact: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { ref: formRef, isVisible: formVisible } = useAnimation({ threshold: 0.1 });
  const { ref: contactRef, isVisible: contactVisible } = useAnimation({ threshold: 0.1 });

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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Валідація: перевіряємо наявність телефону або email
    if (!formData.phone && !formData.email) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Відправляємо дані на сервер
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || (locale === 'ru' ? 'Ошибка отправки сообщения' : 'Failed to send message'));
      }

      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
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
              <div 
                ref={formRef as React.RefObject<HTMLDivElement>}
                className={`${styles.formWrapper} ${formVisible ? styles.animateFadeInUp : ''}`}
              >
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>
                  {locale === 'ru' ? 'Свяжитесь с командой Estedilux Med' : 'Contact the Estedilux Med team'}
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
                    {locale === 'ru' ? 'Ваши ФИО' : 'Your Full Name'}
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
                  <label htmlFor="phone" className={styles.label}>
                    {locale === 'ru' ? 'Телефон' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    placeholder='+380 (00) 000-00-00'
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    placeholder={locale === 'ru' ? 'your.email@example.com' : 'your.email@example.com'}
                    className={styles.input}
                  />
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
                    ? 'Отправить'
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
              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  {locale === 'ru'
                    ? 'Ошибка отправки сообщения. Пожалуйста, попробуйте еще раз.'
                    : 'Error sending message. Please try again.'}
                </div>
              )}
              </div>
              
              <div 
                ref={contactRef as React.RefObject<HTMLDivElement>}
                className={`${styles.contactInfoWrapper} ${contactVisible ? styles.animateFadeInUp : ''} ${styles.animationDelay200}`}
              >
                <div className={styles.contactInfoCard}>
                  <h3 className={styles.contactInfoTitle}>
                    {locale === 'ru' ? 'Контактная информация' : 'Contact Information'}
                  </h3>
                  <div className={styles.contactInfoList}>
                    <a href="mailto:estediluxmed@ukr.net" className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIcon}>
                        <Mail size={20} />
                      </div>
                      <div className={styles.contactInfoContent}>
                        <span className={styles.contactInfoLabel}>
                          {locale === 'ru' ? 'Email' : 'Email'}
                        </span>
                        <span className={styles.contactInfoText}>estediluxmed@ukr.net</span>
                      </div>
                    </a>
                    <a href="tel:+380509994349" className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIcon}>
                        <Phone size={20} />
                      </div>
                      <div className={styles.contactInfoContent}>
                        <span className={styles.contactInfoLabel}>
                          {locale === 'ru' ? 'Телефон' : 'Phone'}
                        </span>
                        <span className={styles.contactInfoText}>+380 50 999 43 49</span>
                      </div>
                    </a>
                    <div className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIcon}>
                        <MapPin size={20} />
                      </div>
                      <div className={styles.contactInfoContent}>
                        <span className={styles.contactInfoLabel}>
                          {locale === 'ru' ? 'Местоположение' : 'Location'}
                        </span>
                        <span className={styles.contactInfoText}>
                          {locale === 'ru' ? 'Украина' : 'Ukraine'}
                        </span>
                      </div>
                    </div>
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

