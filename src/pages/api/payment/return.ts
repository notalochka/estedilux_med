import type { NextApiRequest, NextApiResponse } from 'next';
import { getEventRegistrationByOrderReference, updateEventRegistrationStatus } from '@/lib/db';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Вимкнути bodyParser для multipart/form-data
  },
};

// Функція для парсингу multipart/form-data
function parseForm(req: NextApiRequest): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });
    
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Підтримка GET і POST методів
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  let allParams: any = { ...req.query };
  
  // Якщо POST, парсимо body
  if (req.method === 'POST') {
    try {
      // Спробуємо парсити як multipart/form-data
      const { fields } = await parseForm(req);
      // Форматуємо поля (formidable повертає масиви для кожного поля)
      Object.keys(fields).forEach((key) => {
        allParams[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
      });
    } catch (error) {
      console.error('Error parsing form data:', error);
      // Якщо не вдалося розпарсити, спробуємо як JSON або URL-encoded
      try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        allParams = { ...allParams, ...body };
      } catch (e) {
        // Ігноруємо помилку
      }
    }
  }
  
  // WayForPay може передавати orderReference або orderRef
  const orderReference = allParams.orderReference || allParams.orderRef || allParams.order_reference;
  const transactionStatus = allParams.transactionStatus || allParams.transaction_status;
  const reasonCode = allParams.reasonCode || allParams.reason_code;
  
  console.log('Payment return params:', allParams);
  console.log('Extracted orderReference:', orderReference);
  console.log('Extracted transactionStatus:', transactionStatus);
  
  if (!orderReference) {
    console.log('Order reference missing in return params');
    console.log('Available params:', Object.keys(allParams));
    res.redirect(307, '/payment/success?error=missing_order_ref');
    return;
  }
  
  // Отримуємо дані реєстрації з БД
  try {
    const registration = getEventRegistrationByOrderReference.get(orderReference) as any;
    
    if (!registration) {
      console.log('Registration not found for orderReference:', orderReference);
      res.redirect(307, `/payment/success?orderRef=${orderReference}&error=not_found`);
      return;
    }

    // Перевіряємо статус транзакції
    // WayForPay може передати: Approved, Declined, Pending, etc.
    if (transactionStatus === 'Approved') {
      // Успішна оплата - оновлюємо статус в БД одразу
      const authCode = allParams.authCode || allParams.auth_code || null;
      try {
        updateEventRegistrationStatus.run('paid', authCode, orderReference);
        console.log('Payment status updated to paid in return handler for:', orderReference);
      } catch (error) {
        console.error('Error updating payment status in return handler:', error);
        // Продовжуємо навіть якщо не вдалося оновити статус
      }
      
      console.log('Payment approved for:', orderReference);
      const params = new URLSearchParams({
        orderRef: orderReference,
        eventId: String(registration.event_id)
      });
      res.redirect(307, `/payment/success?${params.toString()}`);
      return;
    } else if (transactionStatus === 'Declined' || transactionStatus === 'Expired') {
      // Невдала оплата
      console.log('Payment declined/expired:', transactionStatus);
      const params = new URLSearchParams({
        orderRef: orderReference,
        eventId: String(registration.event_id),
        reason: reasonCode || 'declined'
      });
      res.redirect(307, `/payment/success?${params.toString()}`);
      return;
    } else {
      // Невідомий статус або оплата в процесі
      console.log('Payment status:', transactionStatus);
      // За замовчанням вважаємо успішною якщо немає явного відхилення
      const params = new URLSearchParams({
        orderRef: orderReference,
        eventId: String(registration.event_id)
      });
      res.redirect(307, `/payment/success?${params.toString()}`);
      return;
    }
  } catch (error) {
    console.error('Error processing payment return:', error);
    res.redirect(307, `/payment/success?orderRef=${orderReference || 'unknown'}&error=processing_error`);
    return;
  }
}

