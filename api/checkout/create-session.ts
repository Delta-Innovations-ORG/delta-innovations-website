import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyToken } from '@clerk/backend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    return res.status(503).json({ error: 'Authentication service not configured' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Sign in required' });
  }

  const token = authHeader.slice(7);

  try {
    await verifyToken(token, { secretKey });
  } catch {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return res.status(501).json({
      error: 'Checkout not available',
      message: 'Stripe is not configured. Contact us for marketplace access.',
    });
  }

  return res.status(501).json({
    error: 'Checkout stub',
    message: 'Stripe checkout session creation will be enabled when billing goes live.',
  });
}
