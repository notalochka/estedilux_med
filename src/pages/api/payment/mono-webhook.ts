import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import {
  getEventRegistrationByMonoInvoiceId,
  updateEventRegistrationStatus,
  updateEventRegistrationStatusFailed,
  getEventById,
} from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function verifyMonoSignature(rawBody: Buffer, xSignHeader: string): Promise<boolean> {
  const token = process.env.NEXT_PUBLIC_MONO_TOKEN;
  if (!token) return false;

  try {
    const pubRes = await fetch('https://api.monobank.ua/api/merchant/pubkey', {
      headers: { 'X-Token': token },
    });
    if (!pubRes.ok) return false;
    const { key: pubKeyBase64 } = (await pubRes.json()) as { key: string };
    if (!pubKeyBase64) return false;

    const pubKeyBuf = Buffer.from(pubKeyBase64, 'base64');
    const signatureBuf = Buffer.from(xSignHeader, 'base64');

    const verify = crypto.createVerify('SHA256');
    verify.update(rawBody);
    verify.end();
    return verify.verify(pubKeyBuf, signatureBuf);
  } catch {
    return false;
  }
}

type MonoWebhookBody = {
  invoiceId: string;
  status: string;
  reference?: string;
  amount?: number;
  failureReason?: string;
  errCode?: string;
  modifiedDate?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await getRawBody(req);
  const xSign = (req.headers['x-sign'] as string) || '';

  if (xSign && !(await verifyMonoSignature(rawBody, xSign))) {
    console.error('Mono webhook: invalid X-Sign signature');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  let body: MonoWebhookBody;
  try {
    body = JSON.parse(rawBody.toString('utf8')) as MonoWebhookBody;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { invoiceId, status } = body;
  if (!invoiceId) {
    return res.status(400).json({ error: 'Missing invoiceId' });
  }

  // реєстрацію шукаємо по mono_invoice_id (заповнюється після створення рахунку)
  const registration = getEventRegistrationByMonoInvoiceId.get(invoiceId) as
    | { id: number; event_id: number; order_reference: string; user_name: string; user_email: string; user_phone: string; specialty: string | null; amount: number; payment_type: string }
    | undefined;

  if (!registration) {
    console.warn('Mono webhook: registration not found for invoiceId', invoiceId);
    return res.status(200).json({ ok: true });
  }

  if (status === 'success') {
    try {
      const event = getEventById.get(registration.event_id) as
        | { title_uk?: string; title_ru?: string; title_en?: string }
        | undefined;
      const eventTitle = event
        ? (event.title_uk || event.title_ru || event.title_en || `Event #${registration.event_id}`)
        : `Event #${registration.event_id}`;

      updateEventRegistrationStatus.run('paid', body.invoiceId, registration.order_reference);

      const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const paymentTypeText =
          registration.payment_type === 'prepayment' ? 'Передоплата (30%)' : 'Повна оплата';
        const message = `
💰 *ПЛАТНА РЕЄСТРАЦІЯ НА ПОДІЮ - ОПЛАЧЕНО (Mono)*

🎯 *Подія:* ${eventTitle}
👤 *ПІБ:* ${registration.user_name}
📧 *Email:* ${registration.user_email}
📱 *Телефон:* ${registration.user_phone}
${registration.specialty ? `🏥 *Спеціальність:* ${registration.specialty}` : ''}
💵 *Сума:* ${registration.amount} USD
💳 *Тип оплати:* ${paymentTypeText}
✅ *Статус:* ОПЛАЧЕНО
📋 *Invoice Mono:* ${invoiceId}
📅 *Дата:* ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}
        `.trim();
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
          }),
        }).catch((err) => console.error('Telegram webhook notification failed:', err));
      }
    } catch (err) {
      console.error('Mono webhook: error updating registration', err);
    }
  } else if (status === 'failure' || status === 'expired' || body.errCode) {
    try {
      updateEventRegistrationStatusFailed.run('failed', body.failureReason || body.errCode || null, registration.order_reference);
    } catch (err) {
      console.error('Mono webhook: error updating failed status', err);
    }
  }

  return res.status(200).json({ ok: true });
}
