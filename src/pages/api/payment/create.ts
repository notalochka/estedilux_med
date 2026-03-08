import type { NextApiRequest, NextApiResponse } from 'next';
import { createEventRegistration, updateEventRegistrationMonoInvoiceId } from '@/lib/db';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const MONO_API = 'https://api.monobank.ua/api/merchant/invoice/create';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventId, eventTitle, price, userName, userPhone, userEmail, specialty, paymentType } = req.body;

  if (!eventId || !eventTitle || !price || !userName || !userPhone || !userEmail || !paymentType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const monoToken = process.env.NEXT_PUBLIC_MONO_TOKEN;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!monoToken) {
    console.error('NEXT_PUBLIC_MONO_TOKEN not configured');
    return res.status(500).json({ error: 'Payment gateway not configured' });
  }

  let amount = parseFloat(String(price).replace(/[^\d.]/g, '')) || 0;
  if (amount <= 0) {
    return res.status(400).json({ error: 'Invalid price' });
  }

  // Мінімальна сума для Mono (у доларах)
  const MIN_AMOUNT = 1.0;
  if (amount < MIN_AMOUNT) {
    amount = MIN_AMOUNT;
  }

  const orderReference = `EVENT_${eventId}_${Date.now()}`;
  const amountInMinorUnits = Math.round(amount * 100); // центи (USD)

  const basketOrder = [
    {
      name: eventTitle,
      qty: 1,
      sum: amountInMinorUnits,
      total: amountInMinorUnits,
      unit: 'шт.',
      code: orderReference,
    },
  ];

  // Зберігаємо реєстрацію до виклику Mono (order_reference = наш ref для redirect)
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
  } catch (dbError: unknown) {
    const err = dbError as { message?: string };
    if (err.message?.includes('UNIQUE constraint')) {
      return res.status(500).json({ error: 'Order reference conflict. Please try again.' });
    }
    console.error('Database error:', dbError);
    return res.status(500).json({ error: 'Failed to save registration' });
  }

  // redirectUrl з ref — Mono не додає параметрів, тому передаємо наш ref
  const invoicePayload = {
    amount: amountInMinorUnits,
    ccy: 840, // USD (ISO 4217)
    merchantPaymInfo: {
      reference: orderReference,
      destination: `Оплата за подію: ${eventTitle}`,
      comment: `Реєстрація на подію. Тип оплати: ${paymentType === 'prepayment' ? 'Передоплата 30%' : 'Повна оплата'}`,
      basketOrder,
    },
    redirectUrl: `${baseUrl}/api/payment/return?ref=${encodeURIComponent(orderReference)}`,
    webHookUrl: `${baseUrl}/api/payment/mono-webhook`,
    validity: 3600,
    paymentType: 'debit',
  };

  try {
    const monoRes = await fetch(MONO_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': monoToken,
      },
      body: JSON.stringify(invoicePayload),
    });

    const invoiceData = await monoRes.json();

    if (!monoRes.ok) {
      console.error('Monobank error:', invoiceData);
      return res.status(500).json({
        error: 'Не вдалося створити рахунок для оплати. Спробуйте пізніше.',
        details: process.env.NODE_ENV === 'development' ? invoiceData : undefined,
      });
    }

    const { invoiceId, pageUrl } = invoiceData;
    if (!invoiceId || !pageUrl) {
      console.error('Monobank response missing invoiceId or pageUrl:', invoiceData);
      return res.status(500).json({ error: 'Invalid response from payment gateway' });
    }

    // Зв’язуємо invoiceId з реєстрацією для webhook
    updateEventRegistrationMonoInvoiceId.run(invoiceId, orderReference);

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
🆔 <b>Рахунок Mono:</b> ${invoiceId}
        `.trim();
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        }).catch((err) => console.error('Telegram notification failed:', err));
      }
    } catch {
      // не блокуємо процес
    }

    res.status(200).json({
      success: true,
      invoiceId,
      invoiceUrl: pageUrl,
    });
  } catch (error) {
    console.error('Payment create error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
}
