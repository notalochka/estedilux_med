import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { ContactFormData } from '@/types';

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          {locale === 'uk' ? 'Контакти - Estedilux Med' : 'Contact - Estedilux Med'}
        </title>
        <meta
          name="description"
          content={
            locale === 'uk'
              ? 'Зв\'яжіться з нами для отримання додаткової інформації'
              : 'Contact us for more information'
          }
        />
      </Head>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: '2rem', textAlign: 'center' }}>
              {locale === 'uk' ? 'Зв\'яжіться з нами' : 'Contact Us'}
            </h1>

            {submitStatus === 'success' && (
              <div
                style={{
                  padding: '1rem',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                  textAlign: 'center',
                }}
              >
                {locale === 'uk'
                  ? 'Дякуємо! Ваше повідомлення відправлено.'
                  : 'Thank you! Your message has been sent.'}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label
                  htmlFor="name"
                  style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
                >
                  {locale === 'uk' ? 'Ім\'я' : 'Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: 'var(--font-size-base)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: 'var(--font-size-base)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
                >
                  {locale === 'uk' ? 'Телефон' : 'Phone'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: 'var(--font-size-base)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
                >
                  {locale === 'uk' ? 'Повідомлення' : 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: 'var(--font-size-base)',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '1rem 2rem',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'all var(--transition-base)',
                }}
              >
                {isSubmitting
                  ? locale === 'uk'
                    ? 'Відправка...'
                    : 'Sending...'
                  : locale === 'uk'
                  ? 'Відправити'
                  : 'Send'}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;

