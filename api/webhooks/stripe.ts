import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'crypto';

function verifyStripeSignature(
  payload: string,
  signature: string | undefined,
  secret: string,
): boolean {
  if (!signature) return false;

  const parts = signature.split(',').reduce<Record<string, string>>((acc, part) => {
    const [key, value] = part.split('=');
    if (key && value) acc[key] = value;
    return acc;
  }, {});

  const timestamp = parts.t;
  const sig = parts.v1;
  if (!timestamp || !sig) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac('sha256', secret).update(signedPayload).digest('hex');

  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return res.status(503).json({ error: 'Stripe webhooks not configured' });
  }

  const signature = req.headers['stripe-signature'];
  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});

  if (!verifyStripeSignature(rawBody, typeof signature === 'string' ? signature : undefined, webhookSecret)) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  return res.status(200).json({ received: true, stub: true });
}
