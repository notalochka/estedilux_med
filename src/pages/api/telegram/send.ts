import type { NextApiRequest, NextApiResponse } from 'next';

interface TelegramMessage {
  chat_id: string;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, type } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials not configured');
    return res.status(500).json({ error: 'Telegram bot not configured' });
  }

  try {
    const telegramMessage: TelegramMessage = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    };

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(telegramMessage),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ error: 'Failed to send message to Telegram', details: data });
    }

    return res.status(200).json({ success: true, messageId: data.result?.message_id });
  } catch (error: any) {
    console.error('Error sending message to Telegram:', error);
    return res.status(500).json({ error: 'Failed to send message to Telegram', details: error.message });
  }
}

