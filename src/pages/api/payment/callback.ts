import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { getEventRegistrationByOrderReference, updateEventRegistrationStatus, updateEventRegistrationStatusFailed, getEventById } from '@/lib/db';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Payment callback received:', req.body);

  const merchantSecretKey = process.env.MERCHANT_SECRET_KEY;

  if (!merchantSecretKey) {
    console.error('MERCHANT_SECRET_KEY not configured');
    return res.status(500).json({ error: 'Payment gateway not configured' });
  }

  const {
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode,
    cardPan,
    transactionStatus,
    reasonCode,
    merchantSignature
  } = req.body;

  // Перевірка підпису
  const signatureString = [
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode,
    cardPan,
    transactionStatus,
    reasonCode
  ].join(';');

  const calculatedSignature = crypto
    .createHmac('md5', merchantSecretKey)
    .update(signatureString)
    .digest('hex');

  if (calculatedSignature !== merchantSignature) {
    console.error('Invalid signature in callback');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Обробка успішної оплати
  if (transactionStatus === 'Approved') {
    console.log('Payment approved in callback for:', orderReference);
    
    try {
      // Отримуємо реєстрацію з БД
      const registration = getEventRegistrationByOrderReference.get(orderReference) as any;

      if (!registration) {
        console.error('Registration not found for orderReference:', orderReference);
        return res.status(404).json({ error: 'Registration not found' });
      }

      // Отримуємо інформацію про подію
      const event = getEventById.get(registration.event_id) as any;
      const eventTitle = event ? (event.title_ru || event.title_en || `Event #${registration.event_id}`) : `Event #${registration.event_id}`;

      // Оновлюємо статус в БД
      updateEventRegistrationStatus.run('paid', authCode, orderReference);

      console.log('Sending Telegram notification for registration:', registration);

      // Відправити повідомлення в Telegram
      const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        try {
          const paymentTypeText = registration.payment_type === 'prepayment' 
            ? 'Предоплата (30%)' 
            : 'Полная оплата';

          const message = `
💰 *ПЛАТНА РЕЄСТРАЦІЯ НА ПОДІЮ - ОПЛАЧЕНО*

🎯 *Подія:* ${eventTitle}
👤 *ПІБ:* ${registration.user_name}
📧 *Email:* ${registration.user_email}
📱 *Телефон:* ${registration.user_phone}
${registration.specialty ? `🏥 *Спеціальність:* ${registration.specialty}` : ''}
💵 *Сума:* ${registration.amount} USD
💳 *Тип оплати:* ${paymentTypeText}
✅ *Статус:* ОПЛАЧЕНО
🔑 *ID транзакції:* ${authCode}
📋 *Order Reference:* ${orderReference}

📅 *Дата:* ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' })}
`;

          const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
          
          const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: message,
              parse_mode: 'Markdown',
            }),
          });

          const telegramData = await telegramResponse.json();
          console.log('Telegram notification sent:', telegramData);
        } catch (error) {
          console.error('Помилка відправки в Telegram:', error);
          // Не повертаємо помилку, бо оплата вже оброблена
        }
      } else {
        console.warn('Telegram credentials not configured');
      }
    } catch (error) {
      console.error('Error processing payment callback:', error);
      // Все одно повертаємо успішну відповідь для WayForPay
    }
  } else {
    console.log('Payment not approved, status:', transactionStatus);
    
    // Оновлюємо статус на failed, якщо потрібно
    try {
      const registration = getEventRegistrationByOrderReference.get(orderReference) as any;
      if (registration && registration.status === 'pending') {
        updateEventRegistrationStatusFailed.run('failed', null, orderReference);
        console.log('Payment status updated to failed for:', orderReference);
      }
    } catch (error) {
      console.error('Error updating failed status:', error);
    }
  }

  // Відповідь для WayForPay (завжди повертаємо успішну відповідь)
  const responseSignature = crypto
    .createHmac('md5', merchantSecretKey)
    .update(`${orderReference};accept;${new Date().getTime()}`)
    .digest('hex');

  res.status(200).json({
    orderReference,
    status: 'accept',
    time: new Date().getTime(),
    signature: responseSignature
  });
}

