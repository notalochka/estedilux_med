import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { createEventRegistration } from '@/lib/db';

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

  const { eventId, eventTitle, price, userName, userPhone, userEmail, specialty, paymentType } = req.body;

  // Валідація обов'язкових полів
  if (!eventId || !eventTitle || !price || !userName || !userPhone || !userEmail || !paymentType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // WayForPay credentials
  const merchantAccount = process.env.MERCHANT_LOGIN;
  const merchantSecretKey = process.env.MERCHANT_SECRET_KEY;
  const merchantDomainName = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!merchantAccount || !merchantSecretKey) {
    console.error('WayForPay credentials not configured');
    console.error('MERCHANT_LOGIN:', merchantAccount ? 'SET' : 'NOT SET');
    console.error('MERCHANT_SECRET_KEY:', merchantSecretKey ? 'SET' : 'NOT SET');
    return res.status(500).json({ error: 'Payment gateway not configured' });
  }

  console.log('Creating payment with merchantAccount:', merchantAccount);
  console.log('Merchant domain:', merchantDomainName);

  // Генеруємо унікальний ID замовлення
  const orderReference = `EVENT_${eventId}_${Date.now()}`;
  const orderDate = Math.floor(Date.now() / 1000);
  let amount = parseFloat(String(price).replace(/[^\d.]/g, '')) || 0;

  if (amount <= 0) {
    return res.status(400).json({ error: 'Invalid price' });
  }

  // WayForPay має мінімальну суму для тестових платежів
  // Для USD мінімальна сума становить 1 USD
  const MIN_AMOUNT = 1.0;
  if (amount < MIN_AMOUNT) {
    console.warn(`Amount ${amount} is less than minimum ${MIN_AMOUNT}. Increasing to minimum.`);
    amount = MIN_AMOUNT;
  }

  // Параметри для підпису (порядок важливий!)
  const signatureString = [
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount,
    'USD',
    eventTitle,
    1, // productCount
    amount // productPrice
  ].join(';');

  // Створюємо HMAC MD5 підпис
  const merchantSignature = crypto
    .createHmac('md5', merchantSecretKey)
    .update(signatureString)
    .digest('hex');

  console.log('Signature string:', signatureString);
  console.log('Generated signature:', merchantSignature);

  // Параметри для WayForPay
  const wayforpayData = {
    merchantAccount,
    merchantAuthType: 'SimpleSignature',
    merchantDomainName,
    merchantSignature,
    orderReference,
    orderDate,
    amount,
    currency: 'USD',
    productName: [eventTitle],
    productCount: [1],
    productPrice: [amount],
    clientFirstName: userName.split(' ')[0] || userName,
    clientLastName: userName.split(' ').slice(1).join(' ') || '',
    clientEmail: userEmail,
    clientPhone: userPhone,
    language: 'UA',
    returnUrl: `${merchantDomainName}/api/payment/return`,
    serviceUrl: `${merchantDomainName}/api/payment/callback`,
  };

  // Зберігаємо реєстрацію в базу даних
  try {
    createEventRegistration.run(
      eventId,
      userName,
      userEmail,
      userPhone,
      specialty || null,
      paymentType,
      amount,
      orderReference,
      'pending'
    );
  } catch (error: any) {
    console.error('Database error:', error);
    // Якщо помилка через дублікат order_reference, генеруємо новий
    if (error.message?.includes('UNIQUE constraint')) {
      return res.status(500).json({ error: 'Order reference conflict. Please try again.' });
    }
    return res.status(500).json({ error: 'Failed to save registration' });
  }

  // Відправляємо повідомлення в Telegram
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramMessage = `
🎯 <b>Нова реєстрація на подію</b>

📋 <b>Подія:</b> ${eventTitle}
👤 <b>Ім'я:</b> ${userName}
📧 <b>Email:</b> ${userEmail}
📱 <b>Телефон:</b> ${userPhone}
${specialty ? `🏥 <b>Спеціальність:</b> ${specialty}` : ''}
💰 <b>Тип оплати:</b> ${paymentType === 'prepayment' ? 'Передоплата (30%)' : 'Повна оплата'}
💵 <b>Сума:</b> ${amount.toFixed(2)} USD
🆔 <b>Номер замовлення:</b> ${orderReference}
      `.trim();

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }).catch((err) => {
        console.error('Failed to send Telegram notification:', err);
        // Не блокуємо процес, якщо Telegram не працює
      });
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    // Не блокуємо процес, якщо Telegram не працює
  }

  console.log('WayForPay data prepared:', JSON.stringify(wayforpayData, null, 2));
  
  res.status(200).json({ success: true, data: wayforpayData });
}

