import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CheckCircle, XCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './PaymentSuccess.module.css';

interface PaymentStatus {
  orderReference: string;
  status: 'pending' | 'paid' | 'failed';
  eventId: number;
  amount: number;
  paymentType: string;
  transactionId: string | null;
  paidAt: string | null;
}

const PaymentSuccessPage: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const { orderRef, eventId } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Чекаємо, поки router буде готовий (query параметри будуть доступні)
    if (!router.isReady) {
      console.log('Router not ready yet, waiting...');
      return;
    }

    const checkPaymentStatus = async () => {
      // Перевіряємо orderRef знову після того, як router готовий
      const currentOrderRef = router.query.orderRef;
      
      console.log('Checking payment status for orderRef:', currentOrderRef);
      console.log('Full router.query:', router.query);
      
      if (!currentOrderRef || typeof currentOrderRef !== 'string') {
        console.error('Order reference missing from query:', router.query);
        setError('Order reference is missing');
        setIsLoading(false);
        return;
      }

      const fetchStatus = async (): Promise<boolean> => {
        try {
          // Додаємо timestamp для уникнення кешування
          const timestamp = Date.now();
          const response = await fetch(`/api/payment/status?orderRef=${encodeURIComponent(currentOrderRef)}&_t=${timestamp}`, {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
            },
          });
          const result = await response.json();

          if (result.success && result.data) {
            setPaymentStatus(result.data);
            // Якщо статус 'paid' або 'failed', припиняємо polling
            if (result.data.status === 'paid' || result.data.status === 'failed') {
              return true; // Статус фінальний, припиняємо перевірку
            }
            return false; // Статус ще 'pending', продовжуємо перевірку
          } else {
            setError(result.error || 'Failed to fetch payment status');
            return true; // Помилка, припиняємо перевірку
          }
        } catch (err) {
          console.error('Error checking payment status:', err);
          setError('Failed to check payment status');
          return true; // Помилка, припиняємо перевірку
        }
      };

      // Перша перевірка
      const shouldStop = await fetchStatus();
      setIsLoading(false);

      // Якщо статус ще 'pending', починаємо polling
      if (!shouldStop) {
        const pollInterval = setInterval(async () => {
          const stop = await fetchStatus();
          if (stop) {
            clearInterval(pollInterval);
          }
        }, 2000); // Перевіряємо кожні 2 секунди

        // Зупиняємо polling через 30 секунд (на випадок, якщо callback не прийде)
        setTimeout(() => {
          clearInterval(pollInterval);
        }, 30000);
      }
    };

    checkPaymentStatus();
  }, [router.isReady, router.query.orderRef]);

  const isPaymentSuccessful = paymentStatus?.status === 'paid';
  const isPaymentFailed = paymentStatus?.status === 'failed';
  const isPaymentPending = paymentStatus?.status === 'pending';

  return (
    <>
      <Head>
        <title>
          {isPaymentFailed
            ? (locale === 'ru' ? 'Оплата не выполнена - Estedilux Med' : 'Payment Failed - Estedilux Med')
            : (locale === 'ru' ? 'Оплата успешна - Estedilux Med' : 'Payment Successful - Estedilux Med')}
        </title>
        <meta
          name="description"
          content={
            isPaymentFailed
              ? (locale === 'ru' ? 'Оплата не была выполнена' : 'Payment was not completed')
              : (locale === 'ru' ? 'Оплата успешно завершена' : 'Payment successfully completed')
          }
        />
      </Head>

      <div className={styles.paymentSuccessPage}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            {isLoading ? (
              <div className={styles.loading}>
                <Loader2 size={48} className={styles.spinner} />
                <p className={styles.loadingText}>
                  {locale === 'ru' ? 'Проверка статуса оплаты...' : 'Checking payment status...'}
                </p>
              </div>
            ) : error ? (
              <div className={`${styles.successCard} ${styles.errorCard}`}>
                <div className={styles.iconWrapper}>
                  <XCircle size={64} className={styles.errorIcon} />
                </div>
                <h1 className={styles.title}>
                  {locale === 'ru' ? 'Ошибка' : 'Error'}
                </h1>
                <p className={styles.message}>{error}</p>
                <div className={styles.actions}>
                  <Link href="/events" className={styles.eventsLink}>
                    {locale === 'ru' ? 'Все события' : 'All Events'}
                  </Link>
                </div>
              </div>
            ) : isPaymentFailed ? (
              <div className={`${styles.successCard} ${styles.failedCard}`}>
                <div className={styles.iconWrapper}>
                  <XCircle size={64} className={styles.failedIcon} />
                </div>
                <h1 className={styles.title}>
                  {locale === 'ru' ? 'Оплата не выполнена' : 'Payment Failed'}
                </h1>
                <p className={styles.message}>
                  {locale === 'ru'
                    ? 'К сожалению, оплата не была успешно обработана. Пожалуйста, проверьте данные вашей карты и попробуйте снова. Если проблема сохраняется, свяжитесь с вашим банком или используйте другую карту.'
                    : 'Unfortunately, the payment was not successfully processed. Please check your card details and try again. If the problem persists, contact your bank or use another card.'}
                </p>
                {(router.query.orderRef || paymentStatus?.orderReference) && (
                  <div className={styles.orderInfo}>
                    <p className={styles.orderLabel}>
                      {locale === 'ru' ? 'Номер заказа:' : 'Order Number:'}
                    </p>
                    <p className={styles.orderNumber}>
                      {paymentStatus?.orderReference || router.query.orderRef}
                    </p>
                  </div>
                )}
                <div className={styles.actions}>
                  {eventId && (
                    <Link 
                      href={`/event/${eventId}`}
                      className={styles.backLink}
                    >
                      <ArrowLeft size={20} />
                      <span>{locale === 'ru' ? 'Вернуться к событию' : 'Back to Event'}</span>
                    </Link>
                  )}
                  <Link 
                    href="/events"
                    className={styles.eventsLink}
                  >
                    {locale === 'ru' ? 'Все события' : 'All Events'}
                  </Link>
                </div>
              </div>
            ) : isPaymentPending ? (
              <div className={`${styles.successCard} ${styles.pendingCard}`}>
                <div className={styles.iconWrapper}>
                  <Loader2 size={64} className={styles.pendingIcon} />
                </div>
                <h1 className={styles.title}>
                  {locale === 'ru' ? 'Оплата обрабатывается' : 'Payment Processing'}
                </h1>
                <p className={styles.message}>
                  {locale === 'ru'
                    ? 'Ваша оплата обрабатывается. Пожалуйста, подождите несколько минут. Мы обновим статус автоматически.'
                    : 'Your payment is being processed. Please wait a few minutes. We will update the status automatically.'}
                </p>
                {(router.query.orderRef || paymentStatus?.orderReference) && (
                  <div className={styles.orderInfo}>
                    <p className={styles.orderLabel}>
                      {locale === 'ru' ? 'Номер заказа:' : 'Order Number:'}
                    </p>
                    <p className={styles.orderNumber}>
                      {paymentStatus?.orderReference || router.query.orderRef}
                    </p>
                  </div>
                )}
                <div className={styles.actions}>
                  {eventId && (
                    <Link 
                      href={`/event/${eventId}`}
                      className={styles.backLink}
                    >
                      <ArrowLeft size={20} />
                      <span>{locale === 'ru' ? 'Вернуться к событию' : 'Back to Event'}</span>
                    </Link>
                  )}
                  <Link 
                    href="/events"
                    className={styles.eventsLink}
                  >
                    {locale === 'ru' ? 'Все события' : 'All Events'}
                  </Link>
                </div>
              </div>
            ) : (
              <div className={styles.successCard}>
                <div className={styles.iconWrapper}>
                  <CheckCircle size={64} className={styles.successIcon} />
                </div>
                <h1 className={styles.title}>
                  {locale === 'ru' ? 'Оплата успешно завершена!' : 'Payment Successfully Completed!'}
                </h1>
                <p className={styles.message}>
                  {locale === 'ru' 
                    ? 'Спасибо за регистрацию! Ваша оплата была успешно обработана. Наши менеджеры свяжутся с вами в ближайшее время.'
                    : 'Thank you for registration! Your payment has been successfully processed. Our managers will contact you shortly.'}
                </p>
                {(router.query.orderRef || paymentStatus?.orderReference) && (
                  <div className={styles.orderInfo}>
                    <p className={styles.orderLabel}>
                      {locale === 'ru' ? 'Номер заказа:' : 'Order Number:'}
                    </p>
                    <p className={styles.orderNumber}>
                      {paymentStatus?.orderReference || router.query.orderRef}
                    </p>
                  </div>
                )}
                <div className={styles.actions}>
                  {eventId && (
                    <Link 
                      href={`/event/${eventId}`}
                      className={styles.backLink}
                    >
                      <ArrowLeft size={20} />
                      <span>{locale === 'ru' ? 'Вернуться к событию' : 'Back to Event'}</span>
                    </Link>
                  )}
                  <Link 
                    href="/events"
                    className={styles.eventsLink}
                  >
                    {locale === 'ru' ? 'Все события' : 'All Events'}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PaymentSuccessPage;


