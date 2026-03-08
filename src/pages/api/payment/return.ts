import type { NextApiRequest, NextApiResponse } from 'next';
import { getEventRegistrationByOrderReference } from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Redirect URL після оплати Mono.
 * Mono може передати invoiceId у query (або orderRef).
 * Реєстрація зберігається з order_reference = invoiceId.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Mono не додає параметрів до redirectUrl — ми передаємо ref при створенні рахунку
  const ref = (req.query.ref as string) || (req.query.orderRef as string) || (req.query.orderReference as string) || (req.query.invoiceId as string);
  const orderReference = typeof ref === 'string' ? ref.trim() : '';
  if (!orderReference) {
    res.redirect(307, '/payment/success?error=missing_order_ref');
    return;
  }

  try {
    const registration = getEventRegistrationByOrderReference.get(orderReference) as
      | { event_id: number; status: string }
      | undefined;

    if (!registration) {
      res.redirect(307, `/payment/success?orderRef=${encodeURIComponent(orderReference)}&error=not_found`);
      return;
    }

    const params = new URLSearchParams({
      orderRef: orderReference,
      eventId: String(registration.event_id),
    });
    res.redirect(307, `/payment/success?${params.toString()}`);
  } catch (error) {
    console.error('Payment return error:', error);
    res.redirect(307, `/payment/success?orderRef=${encodeURIComponent(orderReference)}&error=processing_error`);
  }
}
