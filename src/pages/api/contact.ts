import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  // Валідація: перевіряємо наявність телефону або email
  if (!phone && !email) {
    return res.status(400).json({ error: 'Phone or email is required' });
  }

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  try {
    // Формуємо повідомлення для Telegram
    const telegramMessage = `
📧 <b>Нове повідомлення з контактної форми</b>

👤 <b>Ім'я:</b> ${name}
${phone ? `📱 <b>Телефон:</b> ${phone}` : ''}
${email ? `📧 <b>Email:</b> ${email}` : ''}

💬 <b>Повідомлення:</b>
${message}
    `.trim();

    // Відправляємо в Telegram
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
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

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ error: 'Failed to process contact form', details: error.message });
  }
}

