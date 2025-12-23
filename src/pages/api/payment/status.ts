import type { NextApiRequest, NextApiResponse } from 'next';
import { getEventRegistrationByOrderReference } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Заборона кешування для отримання актуального статусу
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const { orderRef } = req.query;

  if (!orderRef || typeof orderRef !== 'string') {
    return res.status(400).json({ error: 'Order reference is required' });
  }

  try {
    const registration = getEventRegistrationByOrderReference.get(orderRef) as any;

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        orderReference: registration.order_reference,
        status: registration.status, // 'pending', 'paid', 'failed'
        eventId: registration.event_id,
        amount: registration.amount,
        paymentType: registration.payment_type,
        transactionId: registration.transaction_id,
        paidAt: registration.paid_at,
      },
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ error: 'Failed to fetch payment status' });
  }
}

